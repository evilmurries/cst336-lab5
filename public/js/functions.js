
// Event Listeners
$(document).ready(function() {

    // Handles the event of a favorite icon being clicked on
    $(".favoriteIcon").on("click", function() {

        var imageURL = $(this).prev().attr("src");

        // Changes the state of the icon to it's opposite
        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorites(imageURL);
        } else {
            $(this).attr("src", "img/fav_off.png");
        }

    }) // end event

    function updateFavorites(imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL": imageURL, "keyword": "coming soon"}

        })
    }



})