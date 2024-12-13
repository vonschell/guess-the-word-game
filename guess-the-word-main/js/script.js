const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//Displaying the symbols as placeholders for the selected word's letters.
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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        mrssage.innerText = "It is time to enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "Only enter a single letter please.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Only enter a letter from a to z please."
    } else {
        return input;
    }
};