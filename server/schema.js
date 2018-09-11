const {gql} = require('apollo-server-express');
 const schema = gql`
	type Query {
		"gives weather information for given zipcode"
		weather(zipcode: Int!): Climate

		" gives user details"
		user(id: ID
			 firstName: String
			 lastName:String): User 

		forecast(zipcode: Int!):[ForecastWeather]
	}

	type Mutation{
		"creation of new user"
		createUser( firstName: String,
					lastName: String,
					zipcode: Int,
					userName: String!,
					password: String!): String 

		"deletion of user account"
		removeUser(userId:ID!):String

		"updates user information"
		updateUser(userId: ID!,
					firstName: String,
					lastName: String,
					zipcode:Int
					password:String): String
	
		"login to user account"
		login(userName:String!,
			  password:String!):[String]

		"update weather information by user"
		updateUserWeather(zipcode:Int,
							temperature: String,
							weatherCondition: String):String
			
		"Update weather information in database"
		updateWeather(zipcode:Int!): String
	}

	type Subscription {
		userCreated: User
	}
	
	"weather details"
	type Climate {
		zipcode: Int!
		temperature: String!
		pressure: String
		humidity: String
		windSpeed: String
		city: String
		weatherCondition: String
		icon: String
	}

	"user details"
	type User{
		firstName: String
		lastName: String
		userId: ID!
		climate: Climate
	}

	type ForecastWeather{
		name:String
		series: [Series]
	}
	type Series{
		name:String
		value: Int
	}
 `;
 module.exports = schema;