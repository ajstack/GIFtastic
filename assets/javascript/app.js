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
            var imageURL = results.images;//.downsized_still;
            var characterImage = $("<img>");

            characterImage.attr("src", imageURL);
            characterImage.attr("alt", "character image");

            $("#characters").prepend(characterImage);
        }
    });

});
    
$("#addCharacter").on("click", function(event) {

    event.preventDefault();
    var topic = $("#characterInput").val().trim();
    topics.push(topic);   

    
  });



//figure out how to get to the correct URL
//click handler for the pause/play functionality
//figure out why toggleSubmitButton won't play nice with the click handler
//finish commenting rest of code
