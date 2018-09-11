const axios = require('axios');
var apikey = process.env.APIKEY;
exports.getWeatherData = async function getWeatherData(zip){
    try{
        console.log("Entere WEatherAPI");
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
        console.log(error);
    }
}
exports.get5dayForecast = async function get5dayForecast(zip){
    try{
        console.log("entered Weatther API")
        let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=Imperial&appid=${apikey}`;
        let response = await axios.get(url);
        let data= response.data["list"];
        let temp = [];
        for(let i=0;i<data.length;i++){
            let temperature = data[i]['main']['temp'];
            let date = data[i]["dt_txt"];
            let year = date.slice(0,10);
            let out = temp.filter(x => (x.name == year));
            date = date.slice(11,13);
            switch(date){
                case "21": date = "9 PM";
                        break;
                case "00": date = "12 AM";
                        break;
                case "03": date = "3 AM";
                        break;
                case "06": date = "6 AM";
                        break;
                case "09": date = "9 AM";
                        break;
                case "12": date = "12 PM";
                        break;
                case "15": date = "3 PM";
                        break;
                case "18": date = "6 PM";
                        break;
                
            }
            let datejson = {"name":date,"value":Math.round(temperature)};
            if(out.length!=0){
                out[0]["series"].push(datejson);
            }
            else{
                let yearjson = {"name":year,"series":[datejson]};
                temp.push(yearjson);
            }
        }
        console.log(temp[0]);
        return temp;
    }
    catch(error){
        console.log(error);
    }
}

