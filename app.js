// Set up Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Other Dependencies
const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");


// Routes

// Root Route
app.get("/", async function(req, res) {
    var imageURLs = await tools.getRandomImages_promise("", 1);
    res.render("index", {"imageURL": imageURLs});
}); // index


app.get("/search", async function(req, res) {
    //console.dir(req);
    //console.log(req.query.keyword);

    var keyword = req.query.keyword;
    var imageURLs = await tools.getRandomImages_promise(keyword, 9);
    console.log("imageURLs with Promises: " + imageURLs);
    res.render("results", {"imageURLs": imageURLs});
}) // search


app.get("/api/updateFavorites", function(req, res) {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "img_gallery"
    });

    var sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
    var sqlParams = [req.query.imageURL, req.query.keyword];

    conn.connect( function(err) {
        if (err) throw err;

        conn.query(sql, sqlParams, function(err, result) {

            if (err) throw err;

        }); // query
    }) // mysql connect

    res.send("It works!");

}) // updateFavorites


// Local Server Listener
const port = 8081;
app.listen(port, "127.0.0.1", function() {
    console.log("Express Server is Running...");
});

// Heroku Server Deployment
/*

*/