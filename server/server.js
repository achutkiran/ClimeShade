const express = require('express');
const {ApolloServer,gql} = require('apollo-server-express');
const http = require('http');
require('dotenv').config();
const app = express();
const schema = require('./schema');
const resolvers = require('./resolvers');
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: async ({req}) => {
		if(req){
			return {"token":req.headers.token}
		}
	}
});

server.applyMiddleware({app, path:'/graphql'});
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({port: 8000},() => {
	console.log('server started on http://localhost:8000/graphql');
});

//TODO ADD friends List
// ADD Auto update climate from open weather 