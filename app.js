const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
const port = 8080;

var items = [];

// GET Methods
app.get("/", function(req, res){
  var today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  var currentDay = today.toLocaleDateString('en-US', options);
  var day = currentDay;
  // var weeksdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  // day = weeksdays[currentDay];
  res.render("index", {kindofDay: day, item:items});
});

// POST Methods
app.post("/", function(req, res){
  var listItem = req.body.item;
  items.push(listItem);
  console.log("button works");
  console.log("User input: " + listItem);
  res.redirect("/");

});

app.listen(port, function(){
  console.log("server running on port " + port)
});
