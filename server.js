require('dotenv').config();
const express = require("express");
const ejs = require ("ejs");
const https = require ("https");
const FCG = require("fantasy-content-generator");
const fantastical = require ('fantastical');
const sunCalc = require('suncalc');

const app = express();
app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));
app.set('view engine','ejs');


app.get('/favico.ico' , function(req , res){
  });

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


app.post("/weather",function(req, res){
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

app.route("/artifacts*")
  .get(function (req,res){
     res.render(__dirname + "/views/artifacts.ejs", {name: "", desc: "", itemAge:""});
      })
  .post(function(req,res){
    const npc = FCG.Names.generate();
    const item = FCG.MagicItems.generate();
    const age = Math.round(Math.random()*5000/100)*100;
    res.render(__dirname+"/views/artifacts.ejs", {name: `The ${item.formattedData.title}`, desc: `Forged ${age} years ago by ${npc.formattedData.name} the ${npc.formattedData.race} of the ${fantastical.parties.mysticOrder()}.`,itemAge: age});
  });



  function getMoonPhase(){
    const date = (new Date());
    const moonPhase = Math.round(sunCalc.getMoonIllumination(date).phase*100)/100;
    let moon = "";
    switch(true)
    {
      case (moonPhase < 0.1):
        {
          moon = "New Moon";
          break;
        }
        case (moonPhase < 0.24):
        {
            moon = "Waxing Crescent";
            break;
        }
        case (moonPhase < 0.26):
            moon = "First Quarter";
            break;
        case (moonPhase < 0.49):
              moon = "Waxing Gibbous";
              break;
        case (moonPhase < 0.51):
                moon = "Full Moon";
                break;
        case (moonPhase < 0.74):
            moon = "Waning Gibbous";
            break;
        case (moonPhase < 0.76):
              moon = "Last Quarter";
              break;
        case (moonPhase < 1):
              moon = "Waning Crescent";
              break;               
        default:
        {
            moon = "New Moon";
            break;
        }
    }
    const moonObj = {
      date: date,
      currentMoonPhase: moon,
      currentMoonPhaseNumber: moonPhase
    }
    return moonObj;
  }


function getElement(){
  let elements = ["Water", "Earth", "Air", "Fire", "Lightning", "Ice", "Nature", "Death", "Astral"];
  let element = elements[Math.floor(Math.random()*elements.length)];
  return element;
}

function rollDie()
{
  let number = Math.floor(Math.random()*100)+1;
  return number;
}

function predictFortune()
{
  const fortuneObj = {
    moon: getMoonPhase(),
    element: getElement(),
    number: rollDie(),
    chance: ""
  }
  fortuneObj.number += Math.floor(fortuneObj.moon.currentMoonPhaseNumber * 100);
  if(fortuneObj.number % 100 === 0)
  {
    fortuneObj.chance = "Exceptionally lucky."
  }
  if (fortuneObj.number % 10 === 0)
  {
    fortuneObj.chance = "Very Lucky";
  }
  else if (fortuneObj.number % 5 === 0)
  {
    fortuneObj.chance = "Lucky";
  }
  else {
    fortuneObj.chance = "Not so lucky"
  }
  return fortuneObj;
}

let globalDate = new Date();
let fortune = predictFortune();
function Client(fortuneCheckedThisSession, address) {
  this.fortuneCheckedThisSession = fortuneCheckedThisSession;
  this.address = address;
};
const clients = [];


app.route("/inn*")
.get(function(req,res){
  res.render(__dirname + "/views/inn.ejs",{moonText: "", elementText: "", summaryText: "", endText: ""});
})
.post(function(req,res){


  // Creates a new client, storing IP address and pushes to the array if it is new. 
  let newClient = new Client (fortuneCheckedThisSession = false, address = req.header('x-forwarded-for') || req.socket.remoteAddress);
  if(clients.length === 0)
  {
    clients.push(newClient);
    console.log(clients);
  }
  else{
    for (let i = 0; i < clients.length; i++)
    {
      if (newClient.address === clients[i].address)
      {
        console.log("match found");
        console.log(clients);
        newClient = clients[i];
      }
      else if(!newClient.address === clients[i].address)
      {
        console.log("no match found");
        console.log(clients);
      }
      else {
        console.log(clients);
      }
    }
  }



  if(req.body.hasOwnProperty("newRoll")){ //If client clicked the new roll button then give them a new fortune.
    console.log("New Roll Requested");
    newClient.fortuneCheckedThisSession = false;
  }

  globalDate = new Date();

  if(!newClient.fortuneCheckedThisSession)
  {
    fortune = predictFortune();
    res.render(__dirname + "/views/inn.ejs",{moonText:  "Moon Phase: " + fortune.moon.currentMoonPhase, elementText:"Today's Element: " +  fortune.element, summaryText: fortune.chance, endText: ""});
    newClient.fortuneCheckedThisSession = true;
    return;
  }
  else {
    if(globalDate.toLocaleDateString() === fortune.moon.date.toLocaleDateString())
    {
      console.log("Last Posted Date matches todays date. No changes made.");
      res.render(__dirname + "/views/inn.ejs",{moonText: "Moon Phase: " + fortune.moon.currentMoonPhase, elementText: "Today's Element: " + fortune.element, summaryText: fortune.chance, endText:"That's all I have for now. Come back tomorrow, or would you like me to do a reading for someone else?"});
      return;
    }
    else{
      console.log("Last Posted Date does not match todays date. New request made.");
      fortune = predictFortune();
      res.render(__dirname + "/views/inn.ejs",{moonText:  "Moon Phase: " + fortune.moon.currentMoonPhase, elementText:"Today's Element: " +  fortune.element, summaryText: fortune.chance, endText: ""});
    }
  }
});

app.get("/:pageID",function(req,res){
  const requestedPage = (req.params.pageID);
  res.render(__dirname + `/views/${requestedPage}`);
});