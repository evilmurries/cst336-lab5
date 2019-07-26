
// Event Listeners
$(document).ready(function() {

    // Handles the event of a favorite icon being clicked on
    $(".favoriteIcon").on("click", function() {

        var imageURL = $(this).prev().attr("src");

        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorites("add", imageURL);
        } else {
            $(this).attr("src", "img/fav_off.png");
            updateFavorites("delete", imageURL);
        }
    }) // end event

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