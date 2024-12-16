const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Displaying the symbols as placeholders for the selected word's letters
const placeholders = function (word) {
    const placeholdersLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholdersLetters.push("●");
    }
    wordInProgress.innerText = placeholdersLetters.join("");
};

placeholders(word);

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

  const winnerCheck = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats!</p>`;
    }
  };