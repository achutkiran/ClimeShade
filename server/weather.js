const axios = require('axios');
var apikey = process.env.APIKEY;
exports.getWeatherData = async function getWeatherData(zip){
    try{
        let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=Imperial&appid=${apikey}`;
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
        // console.log(error);
    }
}
exports.get5dayForecast = async function get5dayForecast(zip){
    try{
        let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=Imperial&appid=${apikey}`;
        let response = await axios.get(url);
        let data= response.data["list"];
        let temp = [];
        for(let i=0;i<data.length;i++){
            let temperature = data[i]['main']['temp'];
            let date = data[i]["dt_txt"];
            let year = date.slice(0,10);
            let out = temp.filter(x => x.name==year);
            if(out.length!=0){
                out[0]['count'] += 1;
                out[0]['temp'] += temperature;
            }
            else{
                let json = {"name":year,"count":1,'temp':temperature}
                temp.push(json);
            }
        }
        data = [];
        for(let i=0;i<temp.length;i++){
            let json ={};
            json["name"] = temp[i]['name'];
            json["value"]=Math.round(temp[i]['temp']/temp[i]['count']);
            data.push(json);
        }
        out = [{"name":"Weather Forecast",
                "series":data}]
        return out;
    }
    catch(error){
        // console.log(error);
    }
}

