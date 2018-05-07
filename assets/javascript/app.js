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
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>"+ topics[i] + "</button>") 
        buttons.appendTo("#characterButtons");
        $("button").addClass("btn btn-info btn-sm data-topic"); 
        $("button").attr("data-topic", "batman"); //figure out how to define this as i 
    } 
}

createButtons();



$("button").on("click", function(){
    var apiKey = "7nmB5rC887rydxETvwZs3l1ZDEJfK6eG";
    var character = $(this).attr("data-topic"); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + apiKey; + "&limit=1"; //WHY DOESN'T MY LIMIT WORK

    $.ajax({
        url: queryURL,
        method: "GET"
      })

    .then(function(response){ //PUT IN A LOOP MORON
        console.log(response);
        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            var imageURL = results.embed_url;
            var characterImage = $("<img>");

            characterImage.attr("src", imageURL);
            characterImage.attr("alt", "character image");

            $("#characters").prepend(characterImage);
        }
    });

});
    


//data-topic points to data-topic, not a character of any sort
//link to correct place in array
//the promise needs a loop
//write and place the add to array function in appropriate click handler
//will adding to the array automatically add to the button list or do I have to find a way to call it again without repeating buttons?
//click handler for the pause functionality
//aaaaaaaaand now it won't display the right number of gifs. awesome.