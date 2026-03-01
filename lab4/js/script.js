// Global variables
let zipElement = document.querySelector("#zipcode");
let notFoundElement = document.querySelector("#zipNotFound");
let availableElement = document.querySelector("#nameAvailable");

// Event listeners
zipElement.addEventListener("input", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("input", checkUsername);
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#submitBtn").addEventListener("click", validateSubmission);

displayStates();

async function displayCity() {
    let zipcode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (data) {
        notFoundElement.textContent = "";

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
    } else {
        notFoundElement.textContent = "Zip code not found!";
        notFoundElement.style.color = "red";
    }
}

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        for (let state of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = state.state;
            optionEl.value = state.usps;
            document.querySelector("#state").append(optionEl);
        }
        
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

async function displayCounties() {
    let state = document.querySelector("#state").value;

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        document.querySelector("#county").innerHTML = "";

        for (let county of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = county.county;
            document.querySelector("#county").append(optionEl);
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

async function checkUsername() {
    let username = document.querySelector("#username").value;

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        if (data.available) {
            availableElement.textContent = "Username is available!";
            availableElement.style.color = "green";
        } else {
            availableElement.textContent = "Username is taken.";
            availableElement.style.color = "red";
        }
        
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

async function suggestPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);

        document.querySelector("#suggestPassword").textContent = `Suggested Password: ${data.password}`;
        
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

function validateSubmission() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;

    let submissionElement = document.querySelector("#submissionErrors");
    submissionElement.innerHTML = "";

    let noErrors = true;

    if (username.length < 3) {
        let error = document.createElement("div");
        error.textContent = "Username is too short! (Must be at least 3 characters)";
        error.style.color = "red";
        submissionElement.append(error);
        noErrors = false;
    }

    if (password.length < 6) {
        let error = document.createElement("div");
        error.textContent = "Password is too short! (Must be at least 6 characters)";
        error.style.color = "red";
        submissionElement.append(error);
        noErrors = false;
    }

    if (password != confirmPassword) {
        let error = document.createElement("div");
        error.textContent = "Passwords do not match!";
        error.style.color = "red";
        submissionElement.append(error);
        noErrors = false;
    }

    if (noErrors) {
        let message = document.createElement("div");
        message.textContent = "Form submitted successfully!";
        message.style.color = "green";
        submissionElement.append(message);
    }
}

