const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholders(word);
};

getWord();

//Displaying the symbols as placeholders for the selected word's letters
const placeholders = function (word) {
    const placeholdersLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholdersLetters.push("●");
    }
    wordInProgress.innerText = placeholdersLetters.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    messages.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    const goodGuess = validateInput(guess);
  
    if (goodGuess) {
      makeGuess(guess);
    }
    letterInput.value = "";
  });
  
  const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
      messages.innerText = "It is time to enter a letter.";
    } else if (input.length > 1) {
      messages.innerText = "Only enter a single letter please.";
    } else if (!input.match(acceptedLetter)) {
      messages.innerText = "Only enter a letter from a to z please.";
    } else {
      return input;
    }
  };
  
  const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
      messages.innerText = "You already guessed that letter, silly. Try again.";
    } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
      updateRemainingGuesses(guess);
      showGuessedLetters();
      updateWorkInProgress(guessedLetters);
    }
  };

  const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
  };

  const updateWorkInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const letterReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            letterReveal.push(letter.toUpperCase());   
        } else {
            letterReveal.push("●");
        }
    }
    // console.log(letterReveal);
    wordInProgress.innerText = letterReveal.join("");
    winnerCheck();
  };

  const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messages.innerText = `OOPS! The word has no ${guess} sorry.`;
        remainingGuesses -=1;
    } else {
        messages.innerText = `Wonderful guess! This word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        messages.innerHTML = `GAME OVER! The correct word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess left`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses left`;
    }
  };

  const winnerCheck = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
        
        startOver();
    }
  };

  const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
  };

  playAgainButton.addEventListener("click", function () {
    messages.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses left`;
    guessedLettersElement.innerHTML = "";
    messages.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
  })