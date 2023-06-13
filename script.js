
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
let timeLeft = document.getElementById("timeLeft");
let timer = document.getElementById("timer");
let timesUp = document.getElementById("timesUp");
let questionDiv = document.getElementById("questionDiv");
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
let questionIndex = 0;


let totalTime = 30;
function restart() {
    questionIndex = 0;
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
            if (questionIndex < questions.length - 1) {
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
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].options[0];
    choiceB.textContent = questions[questionIndex].options[1];
    
}


function checkAnswer(answer) {

    let lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].options[answer]) {
        
        correctAns++;
        
        answerCheck.textContent = "Correct!";
    } else {
      
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = " The answer " + questions[questionIndex].answer;
    }

    questionIndex++;
    
    if (questionIndex < questions.length) {
        gotoNext();
    } else {
        
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    beginQuiz.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

  
    finalScore.textContent = correctAns;
}


function storeHighScores(event) {
    event.preventDefault();

  
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    beginQuiz.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    let savedHighScores = saved.getItem("high scores");
    let scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    let userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    let scoresArrayString = JSON.stringify(scoresArray);
    window.saved.setItem("high scores", scoresArrayString);
    

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

seeHighscore.addEventListener("click", function(event) { 
    displayScores(event);
});

goBackBtn.addEventListener("click", function() {
    beginQuiz.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.saved.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});