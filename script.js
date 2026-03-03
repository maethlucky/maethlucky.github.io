// Global variables
let darkMode = document.querySelector("#darkMode");
let overlay = document.querySelector("#popupOverlay");

document.querySelector("#darkModeSwitch").addEventListener("click", toggleDarkMode);
document.querySelector("#aboutBtn").addEventListener("click", showAboutWindow);
document.querySelector("#closeMessage").addEventListener("click", hideAboutWindow);

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    }
});

function showAboutWindow() {
    console.log("Displaying pop-up");
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
}

function hideAboutWindow() {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
}

function toggleDarkMode() {
    darkMode.style.backgroundColor = document.querySelector("#darkModeBox").checked ? "white" : "black";
    document.querySelector("#dark1").style.opacity = document.querySelector("#darkModeBox").checked ? "1" : "0";
    document.querySelector("#dark2").style.opacity = document.querySelector("#darkModeBox").checked ? "1" : "0";
}
