var sql = require('mssql');
var weatherAPI = require('./weather');

const config = {
    user: process.env.USER,
    password:  process.env.PASSWORD,
    server:  process.env.SERVER, 
    database:  process.env.DATABASE,
}

//geting temperature readings from database

exports.getTempDb = async function getTempDb(zip){
	let pool =  await new sql.ConnectionPool(config).connect()
	let result =  await new sql.Request(pool)
	    .query(`
	        SELECT * FROM climate WHERE zipcode = ${zip}`)
    if(result.recordset.length!=0){
        return(result.recordset[0])
    }
    else{
        //To do
        return({
            zipcode:00000,
            temperature:'not',
        })
    }
}

//pushing temperature values into database from openweather API

exports.setTempDb = async function setTempDb(zip){
    let data = await weatherAPI(zip);
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .input('temperature',sql.VarChar(10),data.temperature)
        .input('zipcode',sql.Int,data.zipcode)
        .input('pressure',sql.VarChar(10),data.pressure)
        .input('humidity',sql.VarChar(5),data.humidity)
        .input('windSpeed',sql.VarChar(10),data.windSpeed)
        .input('city',sql.VarChar(50),data.city)
        .input('weatherCondition',sql.VarChar(10),data.weatherCondition)
        .query(`
            INSERT INTO climate (
                zipcode,
                temperature,
                pressure,
                humidity,
                windSpeed,
                city,
                weatherCondition
            ) VALUES (
                @zipcode,
                @temperature,
                @pressure,
                @humidity,
                @windspeed,
                @city,
                @weatherCondition
            )
        `)

}

//updating temperature in database
exports.updateWeather = async function updateWeather(zip){
    let out = checkZipExists(zip);
    if(out){
        let data = await weatherAPI(zip);
        let pool = await new sql.ConnectionPool(config).connect()
        let result = await new sql.Request(pool)
            .input('temperature',sql.VarChar(10),data.temperature)
            .input('zipcode',sql.Int,data.zipcode)
            .input('pressure',sql.VarChar(10),data.pressure)
            .input('humidity',sql.VarChar(5),data.humidity)
            .input('windSpeed',sql.VarChar(10),data.windSpeed)
            .input('city',sql.VarChar(50),data.city)
            .input('weatherCondition',sql.VarChar(10),data.weatherCondition)
            .query(`
                UPDATE climate SET 
                    temperature = @temperature,
                    pressure = @pressure,
                    humidity = @humidity,
                    windSpeed = @windspeed,
                    city = @city,
                    weatherCondition = @weatherCondition 
                    WHERE zipcode = @zipcode
            `)
    }
}


//checks whether data for given zipcode exits else import data from open weather  

async function checkZipExists(zip){
    let pool = await new sql.ConnectionPool(config).connect()
    let result = await new sql.Request(pool)
        .query(`
            SELECT * FROM climate WHERE zipcode = ${zip}`)
    //console.log(result)
    if(result.recordset.length!=0){
        return true;
    }
    else{
        await exports.setTempDb(zip);
        return false;
    }
}