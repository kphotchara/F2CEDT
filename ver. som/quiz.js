
const questions = [
    {
        question: 'What is string?',
        choices: ['I like pop music very much!', 'I don\'t know', 'answer', 'string'],
        correctAnswer: 'string',
        hint: 'happy'
    },
    {
        question: 'What is a loop in programming?',
        choices: ['A way to repeat a set of instructions', 'I don\'t know', 'answer', 'loop'],
        correctAnswer: 'A way to repeat a set of instructions',
        hint: 'happybirth'
    },
    {
        question: 'What is a loop in programming?sdas adasasds',
        choices: ['A way to repeat a set of instructions', 'I don\'t know', 'answer', 'loop'],
        correctAnswer: 'A way to repeat a set of instructions',
        hint: 'happybirth'
    },
    {
        question: 'What is love?',
        choices: ['I like pop music very much!', 'I don\'t know', 'answer', 'string'],
        correctAnswer: 'string',
        hint: 'happy'
    },
    {
        question: 'What is twice?',
        choices: ['I like pop music very much!', 'I don\'t know', 'answer', 'string'],
        correctAnswer: 'string',
        hint: 'happy'
    },
    {
        question: 'nayeon?',
        choices: ['I like pop music very much!', 'I don\'t know', 'answer', 'string'],
        correctAnswer: 'string',
        hint: 'happy'
    },
];

let currentQuestionIndex = 0;

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const choices = document.querySelectorAll(`input[name="choice${currentQuestionIndex}"]:checked`);
    
    if (choices.length > 0) {
        const selectedChoice = choices[0].value;
        const parentDiv = choices[0].parentNode;

        if (selectedChoice === currentQuestion.correctAnswer) {
            parentDiv.style.backgroundColor = 'green';
            const correctImage = document.getElementById(`correctImage${currentQuestionIndex+1}`);
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
    const choicesContainer = document.querySelector(`.boxchoice${currentQuestionIndex + 1}`);
    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById(`Question${currentQuestionIndex + 1}`).innerText = currentQuestion.question;
   
    choicesContainer.innerHTML = '';

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const choiceDiv = document.createElement('div');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `choice${currentQuestionIndex}`; // Update this line
        radioInput.value = currentQuestion.choices[i];
        choiceDiv.classList.add('choice');
        choiceDiv.appendChild(radioInput);
        choiceDiv.appendChild(document.createTextNode(currentQuestion.choices[i]));
        choicesContainer.appendChild(choiceDiv);
    }
}
function addClickListener() {
    const enterButton1 = document.querySelector('.Enterbutton1');
    enterButton1.addEventListener('click', checkAnswer);

    const enterButton2 = document.querySelector('.Enterbutton2');
    enterButton2.addEventListener('click', checkAnswer);

    const enterButton3 = document.querySelector('.Enterbutton3');
    enterButton3.addEventListener('click', checkAnswer);

    const enterButton4 = document.querySelector('.Enterbutton4');
    enterButton4.addEventListener('click', checkAnswer);

    const enterButton5 = document.querySelector('.Enterbutton5');
    enterButton5.addEventListener('click', checkAnswer);

    const enterButton6 = document.querySelector('.Enterbutton6');
    enterButton6.addEventListener('click', checkAnswer);


}
function clickhint() {
    const hintButton1 = document.getElementById('ButtonHint1');
    hintButton1.addEventListener('click', () => alert(questions[0].hint));

    const hintButton2 = document.getElementById('ButtonHint2');
    hintButton2.addEventListener('click', () => alert(questions[1].hint));

    const hintButton3 = document.getElementById('ButtonHint3');
    hintButton3.addEventListener('click', () => alert(questions[2].hint));

    const hintButton4 = document.getElementById('ButtonHint4');
    hintButton4.addEventListener('click', () => alert(questions[3].hint));

    const hintButton5 = document.getElementById('ButtonHint5');
    hintButton5.addEventListener('click', () => alert(questions[4].hint));

    const hintButton6 = document.getElementById('ButtonHint6');
    hintButton6.addEventListener('click', () => alert(questions[5].hint));
}

document.addEventListener('DOMContentLoaded', function() {
    addClickListener();
    displayQuestion();
    clickhint();  // Call clickhint after the document is fully loaded
});



addClickListener();
displayQuestion();
