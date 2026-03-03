// Global variables
let mouseCircle = document.querySelector("#mouseCircle");

// Event listeners
document.addEventListener("mousemove", function(e) {
    mouseCircle.style.left = e.clientX;
    mouseCircle.style.top = e.clientY;
})