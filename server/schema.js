const {gql} = require('apollo-server-express');
 const schema = gql`
	type Query {
		weather(zipcode: Int!): Climate
		user(id: ID
			 firstName: String
			 lastName:String): [User] 
	}

	type Mutation{
		createUser( firstName: String,
					lastName: String,
					zipcode: Int,
					userName: String!,
					password: String!): String
		removeUser(userId:ID!):String
		updateUser(userId: ID!,
					firstName: String,
					lastName: String,
					zipcode:Int
					password:String): String
		login(userName:String!,
			  password:String!):String

		updateWeather(zipcode:Int!): String
	}

	type Subscription {
		userCreated: User
	}
	
	type Climate {
		zipcode: Int!
		temperature: String!
		pressure: String
		humidity: String
		windSpeed: String
		city: String
		weatherCondition: String
	}

	type User{
		firstName: String
		lastName: String
		userId: ID!
		climate: Climate
	}
 `;
 module.exports = schema;