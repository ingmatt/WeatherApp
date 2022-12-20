const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});

 app.post("/", function(req,res){

   const query = req.body.cityName;
   const apiKey = "360d0225e8248845001a6fc4d8ca9c70";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

   https.get(url, function(response) {
     console.log(response.statusCode);

     response.on("data", function(data) {
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp;
       const description = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const high = weatherData.main.temp_max;
       const low = weatherData.main.temp_min;
       const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
       res.type("html")
       res.write("<h1>The temperature in " + query + " is " + temp + " Degrees Celsius. </h1>")
       res.write("<h3>The weather is currently " + description + "</h3>")
       res.write("<img src="+ imageURL +" >")
       res.write("<h3>The High today is " + high + " and the Low today is " + low + "</h3>")
       res.end();
     })
   })
 })





app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
