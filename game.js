
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var star = false;
$(document).keydown(function(){
  if(!star)
  {
    $("#level-g").text("Level "+level);
    nextSequence();
    star = true;
}
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
  userClickedPattern =[];
  level++;
  $("#level-g").text("Level "+level);
  var randonNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randonNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name)
{
  var audio = new Audio(name+".mp3");
  audio.play();
}

function animatePress(current)
{

    $("#"+current).addClass("pressed");

    setTimeout(function() {
      $("#"+current).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

  if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-g").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}

function startOver()
{
  level = 0;
  star = false;
  gamePattern = [];
}

/*  $("button").click(function() {
    for(var i = 0;i<gamePattern.length;i++)
    {

      var current = gamePattern[i];
      switch (current)
      {
        case "blue":
        var audio = new Audio("sounds/blue.mp3");
        break;
        case "green":
        var audio = new Audio("sounds/green.mp3");
        break;
        case "red":
        var audio = new Audio("sounds/red.mp3");
        break;
        case "yellow":
        var audio = new Audio("sounds/yellow.mp3");
        break;

        default:
        var audio = new Audio("sounds/wrong.mp3");
      }
    }
  });*/
