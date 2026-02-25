// Global variables
let zipElement = document.querySelector("#zipcode");

// Event listeners
zipElement.addEventListener("input", displayCity);

displayStates();

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

async function displayCity() {
    let zipcode = zipElement.value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipcode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);


    document.querySelector("#city").textContent = data.city;
}