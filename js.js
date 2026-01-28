//initGame function
var wrongLetter = document.querySelector(".input");
var guessText =   document.querySelector(".remainNum");
var wrongLetters = [];
var correctLetters = []
var maxGuess=6;
var remainGuess = maxGuess;
var wrongGuess=0;

//keyboard
var keyboard = document.querySelector(".keyboard");

//gameOver function
var gameModal = document.querySelector(".modal");

//random function
var wordCount = document.querySelector(".word");
var currentWord;

//make reset function 
var resetGame = function(){
    correctLetters = [];
    wrongLetters = []
    wrongGuess = 0;
    remainGuess = maxGuess ;

    document.querySelector(".leftBox img").src =
    "./assets/hangman-" + wrongGuess + ".svg";

    wrongLetter.innerText = "";
    guessText.innerText = remainGuess;

    keyboard.querySelectorAll("button").forEach(function(btn){ btn.disabled=false;})
    wordCount.innerHTML = currentWord.split("").map(function () {
        return ` <li class="letter"></li>`;
    }).join("");
    
    gameModal.classList.remove("show"); // to hide modal
}

//change word 
var ChangeBtn = document.querySelector(".change");
var changeWord = function() {
getRandom();
};
ChangeBtn.addEventListener("click",changeWord);



//get random word from list
var getRandom = function () {
  var { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint b").innerText = hint;
  resetGame();
};

getRandom();
//to reset the game 
var playAgainBtn =document.querySelector(".again")
playAgainBtn.addEventListener("click" , getRandom);

//function to show modal
var gameOver =function(isLose){
setTimeout(function (){
    // check and change content 
    var modalText = isLose? "The correct word was: " : "You found it right ! It was: "
    gameModal.querySelector("img").src =`./assets/${isLose? 'Sad' : 'happySmiley'}.gif`;
    gameModal.querySelector("h4").innerText= isLose ? "Why did you kill me !?" : "Wow !! "
    gameModal.querySelector("p").innerHTML= modalText + "<b>" + currentWord + "</b>"
    
    gameModal.classList.add("show")

},300)
}


//check the letter in word or wrong ==> use in keyboard
var initGame = function ( currentBtn,ClickedLetter) {
  if (currentWord.includes(ClickedLetter)) {
      //to spread the word
    currentWord.split("").forEach(function (letter, i) {
      if (letter === ClickedLetter) {
        correctLetters.push(letter);
        wordCount.querySelectorAll("li")[i].innerText = letter;
        wordCount.querySelectorAll("li")[i].classList.add("writed");
      }
    });
  } else {
     if (wrongLetters.indexOf(ClickedLetter) === -1) {
      wrongLetters.push(ClickedLetter);
          console.log(ClickedLetter, typeof ClickedLetter);

      remainGuess--; // update remain
      wrongGuess++; //update hangman
      wrongLetter.innerText = wrongLetters.join(" - ");

    //  update hangman image
    document.querySelector(".leftBox img").src =
      "./assets/hangman-" + wrongGuess + ".svg";

    }
}
currentBtn.disabled=true;
guessText.innerText = remainGuess;

//show modal 
if(wrongGuess === maxGuess){
    return gameOver(true);
}
if(correctLetters.length === currentWord.length) {
    return gameOver(false);
}
};

//keyboard:
for (let i = 97; i <= 122; i++) {
  var buttons = document.createElement("button");
  buttons.innerText = String.fromCharCode(i); // StackOverflow ==> to show chars
  keyboard.appendChild(buttons);
  // console.log(String.fromCharCode(i));

  // hold the letter
  buttons.addEventListener("click", function () {
    initGame(this, this.innerText.toLowerCase());
  });
}
