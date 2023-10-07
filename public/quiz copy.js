const questions = selectedQuestions;
let currentQuestionIndex = 0;

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const choices = document.querySelector(`input[name="choice"]:checked`);
    console.log(choices);
    if (choices) {
        const selectedChoice = choices.value;
        const parentDiv = choices.parentNode;

        if (selectedChoice === currentQuestion.correctAnswer) {
            
            parentDiv.style.backgroundColor = 'green';
            const correctImage = document.getElementById(`correctImage`);
            correctImage.src = 'correct_image.jpg';  // Replace with the correct path
            correctImage.style.display = 'block';
        } else {
            parentDiv.style.backgroundColor = 'red';
        }

        // Move to the next question
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            alert('All questions answered. Game over!');
        }
    }
}


function displayQuestion() {
    const choicesContainer = document.querySelector('.boxchoice');
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById('Question').innerText = currentQuestion.question;
   
    choicesContainer.innerHTML = '';

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const choiceDiv = document.createElement('div');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'choice'; // Update this line
        radioInput.value = currentQuestion.choices[i];
        choiceDiv.classList.add('choice');
        choiceDiv.appendChild(radioInput);
        choiceDiv.appendChild(document.createTextNode(currentQuestion.choices[i]));
        choicesContainer.appendChild(choiceDiv);
    }
}


function addClickListener() {
    const enterButton = document.querySelector('.Enterbutton');
    enterButton.addEventListener('click', checkAnswer);
}
function clickhint() {
    const hintButton = document.getElementById('ButtonHint');
    hintButton.addEventListener('click', () => alert(questions[currentQuestionIndex].hint));

}

document.addEventListener('DOMContentLoaded', function() {
    addClickListener();
    displayQuestion();
    clickhint();  // Call clickhint after the document is fully loaded
});



addClickListener();
displayQuestion();
