
const questions = [
    {
        question: "Do you have a name?",
        options: ["yes", "no"],
        answer: "yes"
    },
    {
        question: "Do you have an age?",
        options: ["yes", "no"],
        answer: "yes"
    },
    
];




let beginQuiz = document.getElementById("start");
let strtBtn = document.getElementById("start-quiz-button");
let timeLeft = document.getElementById("secondsLeft");
let timer = document.getElementById("timer");
let timesUp = document.getElementById("timesUp");
let questionDiv = document.getElementById("question");
let questionTitle = document.getElementById("questionTitle");
let choiceA = document.getElementById("btn0");
let choiceB = document.getElementById("btn1");

let answerCheck = document.getElementById("answerCheck");



let initialInput = document.getElementById("initialInput");


let highScoreSection = document.getElementById("highScoreSection");
let finalScore = document.getElementById("finalScore");


let seeHighscore = document.getElementById("seeHighscore");
let listOfHighScores = document.getElementById("listOfHighScores");


let correctAns = 0;
let questionNum = 0;
let scoreResult;
let questionStorage = 0;


let totalTime = 30;
function restart() {
    questionStorage = 0;
    totalTime = 30;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    beginQuiz.style.display = "";
    questionDiv.style.display = "";
    timer.style.display = "";
    timesUp.style.display = "";

    let startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionStorage < questions.length - 1) {
                gameOver();
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
    choiceA.textContent = questions[questionStorage].options[0];
    choiceB.textContent = questions[questionStorage].options[1];
    
}


function checkAnswer(answer) {

    let line = document.getElementById("line");
    line.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionStorage].answer === questions[questionStorage].options[answer]) {
        
        correctAns++;
        
        answerCheck.textContent = "Correct!";
    } else {
      
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = " The answer " + questions[questionStorage].answer;
    }

    questionStorage++;
    
    if (questionStorage < questions.length) {
        gotoNext();
    } else {
        
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }


function gameOver() {
    summary.style.display = "";
    questionDiv.style.display = "";
    beginQuiz.style.display = "";
    timer.style.display = "";
    timesUp.style.display = "";

  
    finalScore.textContent = correctAns;
}


function storeHighScores(event) {
    event.preventDefault();

  
    if (initialInput.value === "") {
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
        initials: initialInput.value,
        score: finalScore.textContent
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
    questionDiv.style.display = "";
    timesUp.style.display = "";
    summary.style.display = "";
    highScoreSection.style.display = "";

    let savedHighScores = saved.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    let storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        let eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}



strtBtn.addEventListener("click", restart);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);


submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});





    
    
