const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config({ path: __dirname + "/.env"});

const port = 8080;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var mailKey = process.env.mailChimp;
var mailID = process.env.mailList;
console.log(mailKey, mailID);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;
  const url = "https://us8.api.mailchimp.com/3.0/lists/"+mailID;

  const data = {
      members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const options = {
    method: 'POST',
    auth: "marco925:"+mailKey,
    url: url
  };

  console.log("line 43");
  const request = https.request(url, options, function(response){
    var statusCode = response.statusCode;
    switch (true) {
      case (statusCode <= 300):
        res.sendFile(__dirname + "/success.html");
        break;
      case (statusCode > 300):
        res.sendFile(__dirname + "/failure.html");
        break;
      default:
        console.log("line 59 respCode: " + response.statusCode);
        break;
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || port, function(){
  console.log("listening on port " + port);
});
