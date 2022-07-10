//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {

   res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {

   const firstname = req.body.fname;
   const lastname = req.body.lname;
   const email = req.body.email;

   // console.log(firstname+lastname+email);



   var data = {

      members: [

         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstname,
               LNAME: lastname,
            }
         }
      ]


   };

   var jsonData = JSON.stringify(data);

   const url = "https://us13.api.mailchimp.com/3.0/lists/7eb051e7a2";

   const options = {
      method: "POST",
      auth: "divanshu:9562126958807ee6f92a255b6c5b9cea-us13"

   }

 const request =  https.request(url, options, function (response) {
     
   if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
      
   }
   else{
      res.sendFile(__dirname + "/failure.html");
   }


      response.on("data", function (data) {
         // console.log(JSON.parse(data));

      })

   });
request.write(jsonData);
request.end();

})


app.listen(process.env.PORT || 3000, function () {
   console.log("server is listening on 3000");
});


// api key -- 9562126958807ee6f92a255b6c5b9cea-us13  

// list id / audience id -- 7eb051e7a2