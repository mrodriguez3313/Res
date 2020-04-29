var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var gamePattern = [];
// gamePattern.push(randomChosenColor);
// console.log(randomChosenColor);

// EVENT LISTENERS
// for every button, when someone clicks on it, it will do the button
// animation, play the sound, and add it to their button pressed history.
$(".btn").on("click", function(){
    $(this).fadeOut(50).fadeIn(50);
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
});



// CUSTOM FUNCTIONS
// takes in a string, will play respective sound
function playSound(buttonName) {
  var audio = new Audio("sounds/"+buttonName+".mp3");
  audio.play();
}

// creates a random number, play the respective sound in 'buttonColors' array.
function nextSequence() {
    var randonNumber = Math.floor(Math.random()*3)+1;
    var randomChosenColor = buttonColors[nextSequence()];
    playSound(buttonColors[randonNumber]);
    return randonNumber;
}
