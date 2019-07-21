// Set up Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Other Dependencies
const request = require("request");
const mysql = require("mysql");

// Routes

// Root Route
app.get("/", function(req, res) {
    var requestURL = "https://api.unsplash.com/photos/random?client_id=3226a01cbd2355ea2a0f1f63ca1901a8f8e4ffefeea76d6fe8a8532a2973fc1c&orientation=landscape";
    request(requestURL, function (error, response, body) {

        if (!error) {
            // Extract URL for index.ejs
            var parsedData = JSON.parse(body);
            var imageURL = parsedData["urls"]["regular"];
            res.render("index", {"imageURL": imageURL});
        }
        else {
            // Print the error if one occurred
            console.log('error:', error);
            res.render("index", {"error": "Unable to access API"})
        }
        // Print the response status code if a response was received
        // console.log('statusCode:', response && response.statusCode); 
        // Log the response
        // console.log('body:', body);
    });
});

// Local Server Listener
const port = 8081;
app.listen(port, "127.0.0.1", function() {
    console.log("Express Server is Running...");
});

// Heroku Server Deployment
/*

*/