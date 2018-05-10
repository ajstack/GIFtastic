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

    //clear existing buttons to prevent repeats
    $("#characterButtons").empty();

    // creating new buttons
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>"+ topics[i] + "</button>") 
        
        //adding classes to buttons
        buttons.addClass("btn btn-info btn-sm topicButton"); 
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

//click handler to push topics to array
$("#addCharacter").on("click", function(event) {

    event.preventDefault();
    var topic = $("#characterInput").val().trim();
    topics.push(topic);
    //calling function to create new buttons   
    createButtons();
    
  });

//click function
$("button").on("click", function(){
    var apiKey = "7nmB5rC887rydxETvwZs3l1ZDEJfK6eG";
    //accessing the correct character from attribute
    var character = $(this).attr("data-topic"); 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=" + apiKey + "&limit=10"; 

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
            console.log(imageURL);
            var characterImage = $("<img>");

            //setting attributes to dispaly gif
            characterImage.attr("src", imageURL);
            characterImage.attr("alt", "character image");

            $("#characters").prepend(characterImage);
        }
    });

});





//figure out WHY NEW BUTTONS WON'T WORK
//click handler for the pause/play functionality
//finish commenting rest of code
