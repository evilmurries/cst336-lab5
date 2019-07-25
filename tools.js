
const request = require("request");

module.exports = {

// Return random image URL(s) based on a keyword, callback style
getRandomImages_cb: function (keyword, imageCount, callback) {
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=3226a01cbd2355ea2a0f1f63ca1901a8f8e4ffefeea76d6fe8a8532a2973fc1c";
    request(requestURL, function (error, response, body) {

        if (!error) {
            // Extract URL(s)
            var parsedData = JSON.parse(body);
            var imageURLs = [];

            for (let i = 0; i < imageCount; i++) {
                imageURLs.push(parsedData[i].urls.regular);
            }
            callback(imageURLs);
        }
        else {
            console.log('error:', error);
        }
    });
}, // function

// Return random image URL(s) based on a keyword, promise style
getRandomImages_promise: function (keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=3226a01cbd2355ea2a0f1f63ca1901a8f8e4ffefeea76d6fe8a8532a2973fc1c";

    return new Promise( function(resolve, reject) {
        request(requestURL, function (error, response, body) {

            if (!error) {
                // Extract URL(s)
                var parsedData = JSON.parse(body);
                var imageURLs = [];

                for (let i = 0; i < imageCount; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                resolve(imageURLs);
            }
            else {
                console.log('error:', error);
            }
        });
    }); // promise
} // function

} // export