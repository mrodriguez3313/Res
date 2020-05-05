const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
var port = 8080;
const appId = process.env.weatherKey;
app.use(bodyParser.urlencoded({extended: true}));
console.log(appId);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  // res.send("Server up and running.");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = appId;
  console.log("apikey: " + apiKey);
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?APPID="+apiKey+"&units="+units+"&q="+query;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      // parses json object from the web to be human readable.
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const tdesc = weatherData.weather[0].description;
      const tcity = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>"+tcity+"</h1>");
      res.write("<p>The temperature is " + temp + " and it is " + tdesc + "</p>");
      res.write("<img src="+imageURL+">" );
      res.send();
    })
  });
});

app.listen(port, function(){
  console.log("server is running on port " + port);
});
