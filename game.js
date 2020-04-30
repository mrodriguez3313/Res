//  GLOBAL VARIABLES
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];

var start = false;
var userChosenColor;
var level = 0;
var count = 0;


// EVENT LISTENERS
// When user presses a key for the first time, this will initialize the game.
$("body").keypress(function(event) {
  if (start == false) {
    $("body").removeClass("game-over");
    levelStart(level);
    nextSequence();
    start = true;
  }
});

// for every button, when someone clicks on it, it will do the button
// animation, play the sound, and add it to their button pressed history.
$(".btn").on("click", function() {
    // add .pressed function to this event listener button.
    if (start == true){
      userChosenColor = this.id;
      count++;
      animatePress(userChosenColor);
      playSound(userChosenColor);
      userClickedPattern.push(userChosenColor);
      // console.log(userClickedPattern);
      var correct = checkAnswer(level);
      if ( correct == false) {
        // if user is wrong
        // call wrong pattern function and restart game.
        gameOverScreen();
      } else if (correct == true) {
        levelStart(level);
        nextSequence();
      } else {
        // do nothing, this is normally 'I have the pattern correct up to total gamePattern'.
      }
    }

});



// CUSTOM FUNCTIONS
// takes in a string, will play respective sound
function playSound(buttonName) {
  var audio = new Audio("sounds/"+buttonName+".mp3");
  audio.play();
}

// creates a random number, play the respective sound in 'buttonColors' array.
function nextSequence() {
    level++;
    var randomNumber = Math.floor(Math.random()*3)+1;
    var randomChosenColor = buttonColors[randomNumber];
    setTimeout(function() {
      $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
      playSound(buttonColors[randomNumber]);
      gamePattern.push(randomChosenColor);
      console.log(gamePattern);
    }, 1000);

}
//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// This function will change text of h1 to current level
function levelStart(level) {
  $("h1").text("Level "+ level);
}

// This function is the main program checking users answer
function checkAnswer(currentLevel) {
  if (userChosenColor === gamePattern[count-1] && currentLevel === count) {
    console.log("correct gamePattern length: "+ userClickedPattern.length +" count: " + count + " curr level: " + currentLevel);
    userClickedPattern = [];
    count = 0;
    return true;
  } else if (userChosenColor != gamePattern[count-1]) {
      console.log("wrong userChosenColor: "+userChosenColor+" latestgamepattern "+ gamePattern[count-1] + " count: "+ count);
      return false;
  } else{
    return null;
  }
}

// This functino plays when the user gets the order wrong at any point.
function gameOverScreen() {
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  start = false;
  count = 0;
}
