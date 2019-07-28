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
    res.render("index", {"imageURLs": imageURLs});
}); // index


app.get("/search", async function(req, res) {
    //console.dir(req);
    //console.log(req.query.keyword);

    var keyword = req.query.keyword;
    var imageURLs = await tools.getRandomImages_promise(keyword, 9);
    console.log("imageURLs with Promises: " + imageURLs);
    res.render("results", {"imageURLs": imageURLs, "keyword": keyword});
}) // search


app.get("/api/updateFavorites", function(req, res) {

    var conn = tools.createConnection();

    var sql;
    var sqlParams = [];

    if (req.query.action == "add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
        sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        sql = "DELETE FROM favorites WHERE imageURL = ?"
        sqlParams = [req.query.imageURL, req.query.keyword];
    }

    conn.connect(function(err) {
        if (err) throw err;

        conn.query(sql, sqlParams, function(err, result) {

            if (err) throw err;

        }); // query
    }) // mysql connect

    res.send("It works!");

}); // updateFavorites


app.get("/displayKeywords", async function(req, res) { 
    var imageURLs = await tools.getRandomImages_promise("", 1);
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";

    conn.connect(function(err) {

        if (err) throw err;

        conn.query(sql, function(err, result) {
            if (err) throw err;
            res.render("favorites", {"rows" : result, "imageURLs": imageURLs});
            console.log(result);
        })

    })

}); // displayKeywords

app.get("/api/displayFavorites", function (req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
    var sqlParams = [req.query.keyword];

    conn.connect(function(err, result) {
        if (err) throw err;

        conn.query(sql, sqlParams, function(err, result) {

            if (err) throw err;
            res.send(result);
        })

    })

}); // displayFavorites


// Local Server Listener
/*
const port = 8081;
app.listen(port, "127.0.0.1", function() {
    console.log("Express Server is Running...");
});
*/

// Heroku Server Deployment
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});