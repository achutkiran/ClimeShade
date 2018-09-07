const axios = require('axios');
var apikey = process.env.APIKEY;
module.exports = async function getWeatherData(zip){
    try{
        var url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=Imperial&appid=${apikey}`;
        let response = await axios.get(url)
        let data = response.data;
        return {
            zipcode:zip,
            temperature: Math.round(data.main.temp)+" °F",
            pressure: data.main.pressure+ " hpa",
            humidity: data.main.humidity+"%",
            windSpeed: data.wind.speed+" mph",
            city: data.name,
            weatherCondition: data.weather[0].description,
            icon: data.weather[0].icon
        }
    } catch (error) {
        console.log(error);
    }
}

