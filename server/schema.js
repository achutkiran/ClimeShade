const {gql} = require('apollo-server-express');
 const schema = gql`
	type Query {
		"gives weather information for given zipcode"
		weather(zipcode: Int!): Climate

		" gives user details"
		user(id: ID
			 firstName: String
			 lastName:String): User 
		
		"5 days weather forecast"
		forecast(zipcode: Int!):[fiveDaysForecast]

		"gives user reported weather"
		getUserWeather(zipcode:Int!): ReportedWeatherCondition
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

		"report weather by user"
		updateUserWeather(zipcode:Int,
							weatherCondition: String):String
			
		"Update weather information in database"
		updateWeather(zipcode:Int!): String

	}

	type Subscription {
		"subscribes if new user was created"
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
		userName:String
		climate: Climate
	}

	
	type ForecastWeather{
		name:String
		value: Int
	}

	type fiveDaysForecast{
		name:String
		series:[ForecastWeather]
	}

	type ReportedWeatherCondition{
		weatherCondition:String
		numReportedUsers:Int
	}
 `;
 module.exports = schema;