document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();

function shuffleQ1Choices() {
    let q1Choices = ["Kali Uchis", "A$AP Rocky", "Rex Orange County", "Frank Ocean"];

    q1Choices = _.shuffle(q1Choices);

    for (let choice of q1Choices) {
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

let score = 0;
let quizCount = 0;
if (localStorage.quizCount) {
    quizCount = localStorage.getItem("quizCount");
} else {
    localStorage.setItem("quizCount", 0);
}

function gradeQuiz() {
    score = 0;

    let q1Answer = "Kali Uchis";
    let q2Answer = "Beyonce";
    let q3Answer = "Tinashe";
    let q4Answer = 3;

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

    let q1Image = document.querySelector("#q1Image");
    let q2Image = document.querySelector("#q2Image");
    let q3Image = document.querySelector("#q3Image");
    let q4Image = document.querySelector("#q4Image");
    let q5Image = document.querySelector("#q5Image");

    grade(q1, q1Answer, q1Output, q1Image);
    grade(q2, q2Answer, q2Output, q2Image);
    grade(q3, q3Answer, q3Output, q3Image);
    grade(q4, q4Answer, q4Output, q4Image);

    if (
        q5a.checked &&
        !q5b.checked &&
        q5c.checked &&
        !q5d.checked
    ) {
        q5Output.textContent = "Correct!";
        q5Output.style.color = "green";
        q5Image.src = "img/check.png";
        score++;
    } else {
        q5Output.textContent = "Incorrect!";
        q5Output.style.color = "red";
        q5Image.src = "img/x.png";
    }

    score *= 20;
    quizCount++;
    localStorage.setItem("quizCount", quizCount);

    if (score >= 80) {
        document.querySelector("#scoreNum").textContent = `Your total score is ${score}! Congrats on the good score!`;
        document.querySelector("#scoreNum").style.color = "green";
    } else {
        document.querySelector("#scoreNum").textContent = `Your total score is ${score}!`;
        document.querySelector("#scoreNum").style.color = "black";
    }

    if (quizCount == 1) {
        document.querySelector("#quizCount").textContent = `You have taken the quiz 1 time.`;
    } else {
        document.querySelector("#quizCount").textContent = `You have taken the quiz ${quizCount} times.`;
    }
}

function grade(userAnswer, correctAnswer, outputText, outputImage) {
    if (userAnswer.value == correctAnswer) {
        outputText.textContent = "Correct!";
        outputText.style.color = "green";
        outputImage.src = "img/check.png";
        score++;
    } else {
        outputText.textContent = "Inorrect!";
        outputText.style.color = "red";
        outputImage.src = "img/x.png";
    }
}