const {PubSub} = require('apollo-server');
const userDb = require('./user');
const climateDb = require('./climate');
const pubsub = new PubSub();
const resolvers = {
    Query: {
        async weather(parent, args,context) {
            let out = await climateDb.getTempDb(args.zipcode)
            return out
        },
        async user(parent, args,context){
            let out = await userDb.getUserDb(args,context.token)
            return out
        }
    },

    Mutation: {
        async createUser(parent,args){
            let out = await userDb.setUserDb(args);
            pubsub.publish("User Created",{userCreated: out});
            return "welcome "+args.firstName+" "+args.lastName+" to climeShade with id: "+out.userId;
        },
        async updateUser(parent,args,context){
            let out = await userDb.updateUserDb(args,context.token);
            return out;
        },
        async removeUser(parent,args,context){
            let out = await userDb.removeUserDb(args.userId,context.token);
            return out;
        },
        async login(parent,args){
            let out = await userDb.loginUser(args);
            return out
        },

        async updateWeather(parent,args){
            let out = await climateDb.updateWeather(args.zipcode);
            return "weather information updated";
        },

        async updateUserWeather(parents,args,context){
            let out = await userDb.setUserWeather(args,context.token);
            return out;
        }
    },
    
    Subscription:{
        userCreated: {
            subscribe: () => pubsub.asyncIterator("User Created"),
        },
    },

    User:{
        async climate(user){
            if(user.zipcode!=null){
                let out = await climateDb.getTempDb(user.zipcode)
                return out
            }
        }
    }
};


module.exports = resolvers;