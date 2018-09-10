var sql = require('mssql');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const climateDb = require('./climate');

const config = {
    user: process.env.USER,
    password:  process.env.PASSWORD,
    server:  process.env.SERVER, 
    database:  process.env.DATABASE,
}

exports.loginUser = async function loginUser(args){
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('userName',sql.VarChar(9),args.userName)
        .query(`SELECT firstName, lastName, password, userId, zipcode FROM userdetails WHERE
                userName = @userName`)
    if (result.recordset.length == 0){
        return new Error('user not registered');
    }
    else{
        let out = await validatePassword(args.password,result.recordset[0].password)
        if(out){
            const token = await createToken(result.recordset[0],'10m');
            return token;
        }
        else{
           throw new Error('Wrong Password');
        }
    }
}

//reading user details from database

exports.getUserDb = async function getUserDb(args,token){
    let out = await checkToken(token)
    if(!out){
        return "Please login again";
    }
    if(! await checkUserDetails(args,out)){
        return "you don't have permision"
    }
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,args.id)
        .input('firstName',sql.VarChar(30),args.firstName)
        .input('lastName',sql.VarChar(30),args.lastName)
        .query(`
            SELECT * FROM userdetails WHERE 
            userId = CASE WHEN @userId is null THEN userId ELSE @userId END AND
            firstName = CASE WHEN @firstName is null THEN firstName ELSE @firstName END AND
            lastName = CASE WHEN @lastName is null THEN lastName ELSE @lastName END
            `)
    if(result.recordset.length!=0){
        return(result.recordset)
    }
}

//pushing user details into database

exports.setUserDb = async function setUserDb(args){
    if(args.zipcode!=null){
        await climateDb.updateWeather(args.zipcode);
    }
    let pass = await hashPassword(args.password);
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('firstName',sql.VarChar(30),args.firstName)
        .input('lastName',sql.VarChar(30),args.lastName)
        .input('zipcode',sql.Int,args.zipcode)
        .input('userName',sql.VarChar(9),args.userName)
        .input('password',sql.VarChar(60),pass)
        .query(`
            INSERT INTO userdetails (
                firstName,
                lastName,
                zipcode,
                userName,
                password
            ) 
            OUTPUT Inserted.userId as id
            VALUES(
                @firstName,
                @lastName,
                @zipcode,
                @userName,
                @password
            )
        `)
        args['userId'] = result.recordset[0].id;
        delete args['userName']
        delete args['password']
        return args;
        
}

//removing user from the database
exports.removeUserDb =async function removeUserDb(userId,token){
    let out = await checkToken(token)
    if(!out){
        return "Please login again";
    }
    if(out.userId != userId){
        return "you don't have permision"
    }
    await deleteUserWeather(userId);
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,userId)
        .query(
            `DELETE userdetails where userId = @userId
        `)
    if(result.rowsAffected[0]==0){
        return "No user data found"
    }
    return "User removed"
}

//updating user in database
exports.updateUserDb = async function updateUserDb(args,token){
    let out = await checkToken(token)
    if(!out){
        return "Please login again";
    }
    if(out.userId != args.userId){
        return "you don't have permision"
    }
    if(args.zipcode!=null){
        await climateDb.updateWeather(args.zipcode);
    }
    if(args.password!=null){
        args.password = await hashPassword(args.password);
    }
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,args.userId)
        .input('firstName',sql.VarChar(30),args.firstName)
        .input('lastName',sql.VarChar(30),args.lastName)
        .input('zipcode',sql.Int,args.zipcode)
        .input('password',sql.VarChar(60),args.password)
        .query(
            `UPDATE userdetails SET 
            firstName = CASE WHEN @firstName is null THEN firstName ELSE @firstName END,
            lastName = CASE WHEN @lastName is null THEN lastName ELSE @lastName END,
            zipcode = CASE WHEN @zipcode is null THEN zipcode ELSE @zipcode END,
            password = CASE WHEN @password is null THEN password ELSE @password END 
            WHERE userId = @userId
        `)
    if(result.rowsAffected[0] == 0){
        return "No user data found"
    }
    return "user data updated"
}

exports.setUserWeather = async  function setUserWeather(args,token){
    let out = await checkToken(token);
    if(!out){
        return "Please login";
    }
    if(args.zipcode == null){
        args.zipcode = out.zipcode;
    }
    if(await checkUserWeather(out.userId,args.zipcode)){
        await updateUserWeather(args,out);
        return "Weather information updated"
    }
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,out.userId)
        .input('zipcode',sql.Int,args.zipcode)
        .input('temperature',sql.VarChar(10),args.temperature)
        .input('weatherCondition',sql.VarChar(10),args.weatherCondition)
        .query(`INSERT INTO userClimate (
                    userId,
                    zipcode,
                    temperature,
                    weatherCondition
                )
                VALUES (
                    @userId,
                    @zipcode,
                    @temperature,
                    @weatherCondition)`)
    return "Weather information uploaded";

}

async function updateUserWeather(args,out){
    let pool = await new sql.ConnectionPool(config).connect();
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,out.userId)
        .input('zipcode',sql.Int,args.zipcode)
        .input('temperature',sql.VarChar(10),args.temperature)
        .input('weatherCondition',sql.VarChar(10),args.weatherCondition)
        .query(`UPDATE userClimate SET
                temperature = CASE WHEN @temperature is null THEN temperature ELSE @temperature END,
                weatherCondition = CASE WHEN @weatherCondition is null THEN weatherCondition ELSE @weatherCondition END
                WHERE userId = @userId AND zipcode = @zipcode
        `)
}

async function deleteUserWeather(userId){
    let pool = await new sql.ConnectionPool(config).connect();
    let result = await new sql.Request(pool)
        .input("userId",sql.Int,userId)
        .query("DELETE userClimate WHERE userId = @userId");
}

async function hashPassword(pass){
    return await bcrypt.hash(pass,10);
}

async function validatePassword(pass,hash){
    let out =await bcrypt.compare(pass,hash);
    return out;
}

async function createToken(data,timeout){
    return await jwt.sign(data,process.env.KEY,{expiresIn:timeout});
}

async function checkToken(token){
    try{
        return await jwt.verify(token,process.env.KEY);
    }
    catch(e){
        return false
    }
}

async function checkUserDetails(args,out){
    if(args.firstName != null && args.firstName != out.firstName){
        return false;
    }
    if(args.lastName != null && args.lastName != out.lastName){
        return false;
    }
    if(args.userId != null && args.userId != out.userId){
        return false;
    }
    return true;
}

async function checkUserWeather(userId,zipcode){
    let pool = await new sql.ConnectionPool(config).connect();
    let result = await new sql.Request(pool)
        .input('userId',sql.Int,userId)
        .input('zipcode',sql.Int,zipcode)
        .query(`SELECT *
                FROM userClimate WHERE
                userId = @userId AND
                zipcode = @zipcode
        `)
    if(result.recordset.length!=0){
        return true;
    }
    else{
        return false;
    }
}