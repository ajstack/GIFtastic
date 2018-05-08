var topics = [
    "Bruce Wayne", 
    "Dick Grayson", 
    "Jason Todd", 
    "Tim Drake", 
    "Stephanie Brown", 
    "Cassandra Cain", 
    "Damian Al Ghul", 
    "Barbara Gordon",
    "Kate Kane", 
    "Batman",
    "Robin",
    "Nightwing",
    "Red Hood",
    "Red Robin",
    "Batgirl",
    "Batwoman",
    "Oracle",
    "Joker",
    "Penguin",
    "Mr. Freeze",
    "Riddler",
]

function createButtons() {

    $("#characterButtons").empty();
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>"+ topics[i] + "</button>") 
        
        buttons.addClass("btn btn-info btn-sm"); 
        buttons.attr("data-topic", topics[i]); 
        buttons.appendTo("#characterButtons");
    } 
}





$("button").on("click", function(){
    var apiKey = "7nmB5rC887rydxETvwZs3l1ZDEJfK6eG";
    var character = $(this).attr("data-topic"); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + apiKey + "&limit=1"; 

    $.ajax({
        url: queryURL,
        method: "GET"
      })

    .then(function(response){ 
        console.log(response);
        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            var imageURL = results.images.downsized_still;
            var characterImage = $("<img>");

            characterImage.attr("src", imageURL);
            characterImage.attr("alt", "character image");

            $("#characters").prepend(characterImage);
        }
    });

});
    
$("#addCharacter").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#characterInput").val().trim();

    // Adding movie from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    createButtons();
  });

createButtons();
//link to correct place in array
//the promise needs a loop
//write and place the add to array function in appropriate click handler
//add new buttons without repeats
//click handler for the pause functionality
