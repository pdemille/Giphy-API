$( document ).ready(function() {

    // Array of amazing/geeky/futurisitc movies
    var topic = ["Tron", "Star Wars", "Back to the Future", "Inception", "Predator", "Alien", "Ready Player One", "Avatar"];
    
    //function that displays the gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("movies");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var movies = $("#topicInput").val().trim();
            if (movies == ""){
                return false;//no blank buttons
            }
            topic.push(movies);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(movies);
            displayGifButtons();
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var movies = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            //show results of gifs
            var results = response.data;
            if (results == ""){
                alert("These Aren't the Giphs You're Looking For"); 
            }
            for (var i = 0; i<results.length; i++){
                //put gifs in a div
                var gifDiv = $("<div1>");
                //pull rating of gif
                var gifRating = $("<p>").text("Rating " + results[i].rating.toUpperCase());
                gifDiv.append(gifRating);
    
                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //pause images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animate images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how my movie giphs come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //list of already created Movies
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    //allows funtions to happen upone click
    $(document).on("click", ".movies", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

        });
    });
