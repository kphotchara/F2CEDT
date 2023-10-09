const questions = [];
let savedUsername ="";
let score=0;
let currentQuestionIndex = 0;
const stage = ['F','2','C','E','D','T'] ; 

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

// Call the scroll function when the page loads (you can customize this)
window.addEventListener('load', function () {
    scrollToElement('BGtopstart');
});


fetch('/api/selectedQuestions')
      .then(response => response.json())
      .then(selectedQuestions => {
        questions.push(...selectedQuestions);
        displayQuestion();
        clickhint();
        addClickListener1();
        addClickListener2();
      })
      .catch(error => {
        console.error('Error fetching questions: ', error);
      });


const startButton = document.getElementById('startbutton');

startButton.addEventListener('click', () => {
  scrollToElement('spaceHowtoplay');
});

const NextButton = document.getElementById('nextbutton_howtoplay');

// เพิ่ม Event Listener สำหรับปุ่ม "start"
NextButton.addEventListener('click', () => {
  scrollToElement('background-som');
});
    
    
//console.log(questions);
// สร้างฟังก์ชันเพื่อเลื่อนไปยังส่วน "Question"
function goToQuestion() {
    scrollToElement('QQQ');
  }

function loadUserScores() {
  fetch('/api/scores')
    .then(response => response.json())
    .then(scores => {
        const congratToUser= document.getElementById('congreat');
        const scoresList = document.getElementById('score');
        const DontAng = document.getElementById('donot_angry');
        const UtoS = document.getElementById('grade_S');

      scores.forEach((user, index) => {
        if(user.username == savedUsername){
            congratToUser.innerHTML = `ยินดีด้วยคุณ ${user.username}`;
            scoresList.innerHTML = `ได้คะเเนน ${user.score} เต็ม 6 คะเเนน <br> คุณอยู่ลำดับที่ ${index+1}`;
            DontAng.innerHTML = 'หัวหน้ากองบัญชาการไม่โกรธคุณ';
            UtoS.innerHTML = 'และให้ S ในวิชา COMPUTER PROGRAMMING แก่คุณ';
        }
      });

    })
    .catch(error => {
      console.error('Error fetching user scores: ', error);
    });
}




function goToEnd() {
    scrollToElement('BGWIN');
    loadUserScores();
    const Endpage = document.getElementById('BGWIN');
    Endpage.style.backgroundImage = "url('img/clearBG.png')";

    }

// เริ่มต้นโดยรับอ้างอิงของฟอร์มและหน้า QQQ
const loginForm = document.getElementById('login-form');
const QQQNav = document.getElementById('QQQ');

// เพิ่มการแอดดินฟังก์ชันสำหรับการส่งฟอร์ม
loginForm.addEventListener('submit', function(event) {
  // ป้องกันการรีเฟรชหน้าเว็บ
  event.preventDefault();
  
  // หาค่า username ที่ผู้ใช้กรอก
  const usernameField = document.getElementById('username-field');
  const username = usernameField.value;

  // ตรวจสอบว่า username ไม่ว่าง
  // เพิ่มส่วนนี้ในฟังก์ชันการส่งฟอร์ม
if (username.trim() !== '') {
    savedUsername=username; 
    // เรียกใช้ฟังก์ชันเพื่อเลื่อนไปยังส่วน "Question"
    goToQuestion();
  }
   else {
    // ถ้า username ว่างเปล่าให้ทำอะไรตามที่คุณต้องการ
    alert('กรุณากรอก Username ก่อน');
  }
});

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const choices = document.querySelector(`input[name="choice"]:checked`);
    console.log(choices);
    if (choices) {
        
        const selectedChoice = choices.value;
        const parentDiv = choices.parentNode;

        if (selectedChoice === currentQuestion.correctAnswer) {
            const imagePath = `img/IMG_${currentQuestionIndex + 2728}.png`;
            score++;
            parentDiv.style.backgroundColor = 'green';
            const correctImage = document.getElementById('correctImage');
            correctImage.src = imagePath;  // Replace with the correct path
            correctImage.style.display = 'block';
            document.getElementById('hint').innerText = "เย่ตอบถูกเเล้ว";
        } else {
            parentDiv.style.backgroundColor = 'red';
            const correctImage = document.getElementById('correctImage');
            correctImage.src = 'img/final_ufo_2.png';  // Replace with the correct path
            correctImage.style.display = 'block';
        }

        const radioInputs = document.querySelectorAll(`input[name="choice"]`);
        radioInputs.forEach(input => {
            input.disabled = true;
        });
    
        
    }
}


function displayQuestion() {
    const choicesContainer = document.querySelector('.boxchoice');
    const currentQuestion = questions[currentQuestionIndex];
    const hintButton = document.getElementById('ButtonHint');
    const enterButton = document.getElementById('enterbtn');
    const ansButton = document.getElementById('ansbtn');
    
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
    ansButton.style.display = 'block';
    hintButton.style.display = 'block';  // Show Hint button
    enterButton.style.display = 'block'; // Show Enter button
    const correctImage = document.getElementById('correctImage');
    correctImage.src = 'img/final_robot.png';  // Replace with the correct path
    correctImage.style.display = 'block';
    document.getElementById('stars').innerText = `STAR ${stage[currentQuestionIndex]}`;
    document.getElementById('hint').innerText = "ตอบคำถามให้ถูกเพื่อช่วยโรบอท";
    
    addClickListener1();
    addClickListener2();
}



function nextQuestion(){
    currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            fetch('/api/saveScore', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username" :savedUsername, "score":score })
              })
              .then(response => response.json())
              .then(data => {
                console.log(data.message); // แสดงข้อความจากเซิร์ฟเวอร์
                //alert(`All questions answered. Game over! Your score: ${score}/${questions.length}`);
                goToEnd();
              })
              .catch(error => {
                console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
              });
        
            
        }

        const radioInputs = document.querySelectorAll(`input[name="choice"]`);
        radioInputs.forEach(input => {
            input.checked = false;
            input.disabled = false;
        });

}

function addClickListener1() {
    const ansButton = document.querySelector('.AnsButton');
    ansButton.addEventListener('click', checkAnswer);
}
function addClickListener2() {
    const enterButton = document.querySelector('.EnterButton');
    enterButton.addEventListener('click', nextQuestion);
}

function clickhint() {
    const hintButton = document.getElementById('ButtonHint');
    hintButton.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        const hint = currentQuestion.hint;
        if (hint) {
            document.getElementById('hint').innerText = hint;
        } else {
            alert("No hint available for this question.");
        }
    });
}



