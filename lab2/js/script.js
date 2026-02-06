// event listeners
document.querySelector("#guessBtn").addEventListener("click", guess);

// functions
function guess() {
    // .value is only for input elements
    let userGuess = document.querySelector("#userGuess").value;
    alert(userGuess);
}