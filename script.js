
// questions which will be prompted to user after they hit start
const questions = [
    {
        question: "Do you have a name?",
        choices: ["yes", "no"],
        answer: "yes"
    },
    {
        question: "Do you have an age?",
        choices: ["yes", "no"],
        answer: "yes"
    },
    
];
// listing elements to assign their id
let beginQuiz = document.getElementById("start");
let strtBtn = document.getElementById("quiz-button");
let timeLeft = document.getElementById("secondsLeft");
let questionInfo = document.getElementById("question");
let questionTitle = document.getElementById("questionTitle");
let choiceA = document.getElementById("btn0");
let choiceB = document.getElementById("btn1");
let doubleCheck = document.getElementById("check");
let Input = document.getElementById("Input");
let highScoreSection = document.getElementById("highScoreSection");
let Score = document.getElementById("Score");
let seeHighscore = document.getElementById("seeHighscore");
let listOfHighScores = document.getElementById("listOfHighScores");
let correctAnswer = 0;
let questionNum = 0;
let questionStorage = 0;
let totalTime = 30;
function restart() { // restart function allows user to play again once they submit their initials
    questionStorage = 0;
    totalTime = 30;
    timeLeft.textContent = totalTime;
    Input.textContent = "";
    beginQuiz.style.display = "";
    questionInfo.style.display = "";
    timer.style.display = "";
    timesUp.style.display = "";
    let startTimer = setInterval(function() { //https://stackoverflow.com/questions/74297160/stop-countdown-timer-at-0 used for timer reference
    (totalTime--)
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionStorage < questions.length ) {
                finish();
            }
        }
    },1000);
    openQuiz();
};


function openQuiz() {
    gotoNext();
}

function gotoNext() {
    questionTitle.textContent = questions[questionStorage].question;
    choiceA.textContent = questions[questionStorage].choices[0];
    choiceB.textContent = questions[questionStorage].choices[1];
    
}


function checkAnswer(answer) {
    let line = document.getElementById("line");
    line.style.display = "";
    doubleCheck.style.display = "";
    if (questions[questionStorage].answer === questions[questionStorage].choices[answer]) {       
        correctAnswer++;       
        console.log = ("Correct");
    } else {      
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        doubleCheck.textContent = " answer " + questions[questionStorage].answer;
    }
    questionStorage++;  
    if (questionStorage < questions.length) {
        gotoNext();
    } else {       
        finish();
    }
}

function chooseA() { checkAnswer(0); }
function chooseB() { checkAnswer(1); }
function finish() {
    summary.style.display = "";
    questionInfo.style.display = "";
    beginQuiz.style.display = "";
    timer.style.display = "";
    timesUp.style.display = "";  
    Score.textContent = correctAnswer;
}

function storeHighScores(event) {
    event.preventDefault(); 
    if (Input.value === "") {
        alert("enter your initials");
        return;
    } 
    beginQuiz.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   
    let savedHighScores = saved.getItem("high scores");
    let storeScores;
    if (savedHighScores === null) {
        storeScores = [];
    } else {
        storeScores = JSON.parse(savedHighScores)
    }
    let userScore = {
        initials: Input.value,
        score: Score.textContent
    };
    console.log(userScore);
    storeScores.push(userScore);
    let storeScoresString = JSON.stringify(storeScores);
    window.saved.setItem("high scores", storeScoresString);
    displayScores();
}
let i = 0;
function displayScores() {
    beginQuiz.style.display = "";
    timer.style.display = "";
    questionInfo.style.display = "";
    timesUp.style.display = "";
    summary.style.display = "";
    highScoreSection.style.display = "";
    let savedHighScores = JSON.parse(saved.getItem("high scores"));
    if (savedHighScores === null) {
        return;
    }
    }
strtBtn.addEventListener("click", restart);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);









    
    