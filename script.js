// Global variables
let darkMode = document.querySelector("#darkMode");
let overlay = document.querySelector("#popupOverlay");

document.querySelector("#darkModeSwitch").addEventListener("click", toggleDarkMode);
document.querySelector("#aboutBtn").addEventListener("click", showAboutWindow);

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") overlay.style.display = "none";
});

function showAboutWindow() {
    console.log("Displaying pop-up");
    overlay.style.display = "flex";
}

function toggleDarkMode() {
    darkMode.style.backgroundColor = document.querySelector("#darkModeBox").checked ? "white" : "black";
}
