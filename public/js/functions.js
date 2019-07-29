
// Event Listeners
$(document).ready(function() {

    // Handles the event of a favorite icon being clicked on
    $(".favoriteIcon").on("click", function() {

        var imageURL = $(this).prev().attr("src");

        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "/img/fav_on.png");
            updateFavorites("add", imageURL);
        } else {
            $(this).attr("src", "/img/fav_off.png");
            updateFavorites("delete", imageURL);
        }
    }) // end event

    // Handles the 
    $(".keywordLink").on("click", function() {

        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: { "keyword": $(this).text().trim()},
            success: function(rows, status) {
                $("#favorites").html("");
                rows.forEach(function(row, i) {

                    if (i%4==0) {
                        $("#favorites").append("<br />");
                    } else {
                        $("#favorites").append("");
                    }
                    $("#favorites").append("<img class='favImage' src='" + row.imageURL + "' width='200' height='200'>");
                    $("#favorites").append("<img src='/img/fav_on.png' class='favoriteIconResults' width='20'>")
                })
            }
        })
    });

    // Adds a new favorite image to the database
    function updateFavorites(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL": imageURL, 
                    "keyword": $("#keyword").val(), 
                    "action": action}
        })
    } 

})