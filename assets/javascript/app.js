var topics = [
    "Bruce Wayne", 
    "Dick Grayson", 
    "Jason Todd", 
    "Tim Drake", 
    "Stephanie Brown", 
    "Cassandra Cain", 
    "Damian Al Ghul", 
    "Barbara Gordon", 
    "Batman",
    "Robin",
    "Nightwing",
    "Red Hood",
    "Red Robin",
    "Batgirl",
    "Batwoman",
    "Joker",
    "Mr. Freeze",
    "Riddler",
]

function createButtons() {

    //clear existing buttons to prevent repeats
    $("#characterButtons").empty();

    // creating new buttons
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>"+ topics[i] + "</button>") 
        
        //adding classes to buttons
        buttons.addClass("btn btn-warning btn-sm topicButton"); 
        buttons.attr("data-topic", topics[i]); 

        //appending buttons
        buttons.appendTo("#characterButtons");
    } 
}
//calling function
createButtons();

function toggleSubmitButton(){ 

    //setting assumption that the input does not have characters
    $("#addCharacter").attr("disabled", true);
    $("#characterInput").keyup(function(){
        //if characterInput isn't empty
        if($(this).val().length != 0){
            //allow submit button
            $("#addCharacter").attr("disabled", false);
        }else{
            //otherwise leave it disabled
            $("#addCharacter").attr("disabled", true);
        }
    })
}

//calling function
toggleSubmitButton();

function findGifs() {

}

//click function to get gifs
$("button").on("click", function(){

    var apiKey = "7nmB5rC887rydxETvwZs3l1ZDEJfK6eG";
    //accessing the correct character from attribute
    var character = $(this).attr("data-topic"); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + apiKey + "&limit=1"; 

    //ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
      })


    //promise
    .then(function(response){ 
        console.log(response);
        var results = response.data;

        //accessing the correct gifs
        for (var j = 0; j < results.length; j++) {
            var imageURL = results[j].images.downsized_still.url;
            var imageURLAnimate = results[j].images.downsized_large.url;
            //console.log(imageURL);
            var characterImage = $("<img>");
            //console.log(results[j].rating)
            var p = $("<p>").text("Rating: " + results[j].rating);
            //setting attributes to dispaly gif
            characterImage.attr("src", imageURL);
            characterImage.attr("alt", "character image");
            characterImage.attr("data-still", imageURL);
            characterImage.attr("data-animate", imageURLAnimate);
            //console.log(imageURLAnimate);
            characterImage.attr("data-state", "still");
            characterImage.addClass("gif");
            

            $("#characters").prepend(characterImage);
            $("#characters").prepend(p);
        }
    });

});

//click handler to push topics to array
$(document).on("click", "#addCharacter", function(event) {

    event.preventDefault();
    var topic = $("#characterInput").val().trim();
    topics.push(topic);
    //calling function to create new buttons   
    createButtons();
    
  });
  
//click handler to play/pause
$(document).on("click", "img.gif", function() { //{not working, it's not reacting to being clicked on at all...}
    var state = $(this).attr("data-state");
    //console.log(this);

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


//figure out WHY NOTHING WORKS AFTER I ADD A NEW BUTTON
//click handler for the pause/play functionality {not working}
//add ratings {not working}
//finish commenting rest of code
