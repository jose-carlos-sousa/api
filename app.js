const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.Email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/65b9932a5c";
  const options = {
    method: "POST",
    auth: "josesousa:b51c9896e515fbf37a9cec50bd67b294-us21"
  };

  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
      if(response.statusCode>=400 ){res.sendFile(__dirname+"/failure.html")}
      else{res.sendFile(__dirname+"/success.html")}
    });
    
  });
  
  console.log(request)

  request.write(jsonData);
  request.end();

 
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});











//65b9932a5c

//b51c9896e515fbf37a9cec50bd67b294-us21