// event listeners
document.querySelector("#guessBtn").addEventListener("click", guess);
document.querySelector("#playBtn").addEventListener("click", reset);

// global variables
let random = Math.floor(Math.random() * 99) + 1; // 1-99
let attempts = 0;
let wins = 0;
let losses = 0;

console.log(random);

let hiLo = document.querySelector("#hiLo");

document.querySelector("#playBtn").style.display = "none";

// functions
function isValid(userGuess) {
    if (!Number.isInteger(userGuess)) {
        alert("Error: guess is not a number");
        return false;
    }

    if (userGuess < 1 || userGuess > 99) {
        alert("Error: guess out of range");
        return false;
    }

    return true;
}

function guess() {
    // .value is only for input elements
    let userGuess = parseInt(document.querySelector("#userGuess").value);
    // alert(userGuess);

    if (!isValid(userGuess)) {
        return;
    }

    document.querySelector("#userGuesses").textContent += `${userGuess} `;
    document.querySelector("#userGuesses").style.color = "red";

    attempts++;

    if (userGuess > random) {
        hiLo.textContent = "Too high!"
        hiLo.style.color = "red";
    } else if (userGuess < random) {
        hiLo.textContent = "Too low!"
        hiLo.style.color = "blue";
    } else {
        hiLo.textContent = "Congratulations!"
        hiLo.style.color = "green";
        document.querySelector("#userGuesses").textContent = "";
        wins++;
        document.querySelector("#playBtn").style.display = "inline";
        document.querySelector("#guessBtn").style.display = "none";
    }

    if (attempts == 7) {
        hiLo.textContent = `You lost! The correct number was ${random}.`;
        hiLo.style.color = "red";
        document.querySelector("#userGuesses").textContent = "";
        losses++;
        document.querySelector("#playBtn").style.display = "inline";
        document.querySelector("#guessBtn").style.display = "none";
    }

    document.querySelector("#attempts").textContent = attempts;
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}

function reset() {
    attempts = 0;
    random = Math.floor(Math.random() * 99) + 1;
    document.querySelector("#playBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    hiLo.textContent = "";
    document.querySelector("#attempts").textContent = attempts;

    console.log(random);
}
