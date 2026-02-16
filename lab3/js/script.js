document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["font-color", "color", "text-color", "fontColor"];

    q1Choices = _.shuffle(q1Choices);

    for (choice of q1Choices) {
        let radioElement = document.createElement("input");
        radioElement.type = "radio";
        radioElement.name = "q1";
        radioElement.value = choice;

        let labelElement = document.createElement("label");
        labelElement.textContent = choice;
        labelElement.prepend(radioElement);

        document.querySelector("#q1").append(labelElement);
    }
}

function gradeQuiz() {
    let score = 0;

    let q1Answer = "color";
    let q2Answer = "font-size";
    let q3Answer = "flexbox";
    let q4Answer = 50;

    let q1 = document.querySelector("input[name=q1]:checked");
    let q2 = document.querySelector("#q2");
    let q3 = document.querySelector("select");
    let q4 = document.querySelector("#q4");

    let q5a = document.querySelector("#q5a");
    let q5b = document.querySelector("#q5b");
    let q5c = document.querySelector("#q5c");
    let q5d = document.querySelector("#q5d");

    let q1Output = document.querySelector("#q1Output");
    let q2Output = document.querySelector("#q2Output");
    let q3Output = document.querySelector("#q3Output");
    let q4Output = document.querySelector("#q4Output");
    let q5Output = document.querySelector("#q5Output");

    if (q1.value == q1Answer) {
        q1Output.textContent = "Correct!";
        q1Output.style.color = "green";
        score++;
    } else {
        q1Output.textContent = "Incorrect!";
        q1Output.style.color = "red";
    }

    if (q2.value == q2Answer) {
        q2Output.textContent = "Correct!";
        q2Output.style.color = "green";
        score++;
    } else {
        q2Output.textContent = "Incorrect!";
        q2Output.style.color = "red";
    }

    if (q3.value == q3Answer) {
        q3Output.textContent = "Correct!";
        q3Output.style.color = "green";
        score++;
    } else {
        q3Output.textContent = "Incorrect!";
        q3Output.style.color = "red";
    }

    if (q4.value == q4Answer) {
        q4Output.textContent = "Correct!";
        q4Output.style.color = "green";
        score++;
    } else {
        q4Output.textContent = "Incorrect!";
        q4Output.style.color = "red";
    }

    if (
        q5a.checked &&
        q5b.checked &&
        !q5c.checked &&
        !q5d.checked
    ) {
        q5Output.textContent = "Correct!";
        q5Output.style.color = "green";
        score++;
    } else {
        q5Output.textContent = "Incorrect!";
        q5Output.style.color = "red";
    }

    score *= 20;

    document.querySelector("#scoreNum").textContent = `Your total score is: ${score}`;
}