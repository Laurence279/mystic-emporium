require('dotenv').config()
const express = require("express");
const ejs = require ("ejs");
const https = require ("https");

const app = express();
app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));
app.set('view engine','ejs');




app.get("/",function(req,res)
{
  res.render(__dirname + "/views/index.ejs");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function(){
  console.log("Server open on port "+port);
});

app.get("/weather.ejs",function(req,res)
{
  res.render(__dirname + "/views/weather.ejs",{resultTemp: "",resultWeather: "", resultIcon:""});
});


app.post("/",function(req, res){
  const query = req.body.city;
  const apiKey = process.env.WeatherAPI;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode >= 400 || query === "")
    {
      res.render(__dirname + "/views/weather.ejs",{resultTemp: "The location you speak of is not known to me.", resultWeather: "", resultIcon: ""});
      return;
    }
    response.on("data", function(data)
    {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = Math.round(weatherData.main.temp);
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const country = weatherData.sys.country;
      const city = weatherData.name;

      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(icon);
        const foundIcon = (iconURL);
        const foundTemp = (`Temperature in ${city}, ${country} is ${temp} degrees.`);
        const foundWeather = ("Current conditions are " + desc +".");
        res.render(__dirname + "/views/weather.ejs",{resultTemp: foundTemp, resultWeather: foundWeather, resultIcon: foundIcon});
    })
  });
});


app.get("/:pageID",function(req,res){
  const requestedPage = (req.params.pageID);
  res.render(__dirname + `/views/${requestedPage}`);
});