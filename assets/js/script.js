var quizHeader = $('#container-header');
var quizBody = $('#container-body');
var quizFooter = $('#container-footer');

var startTitle = $('<h2>').text('Coding Quiz Challenge');
quizHeader.append(startTitle);
var instructions = $('<p>').text('Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!');
quizBody.append(instructions);
var startBtn = $('<button>').addClass('buttons').text('Start Quiz');
quizBody.append(startBtn);

var questionHeadder = $('<h2>');
quizHeader.append(questionHeadder);
var answerList = $('<ul>').addClass('button-list');
quizBody.append(answerList);

var questionArr = [
    {
        question: "Question",
        answerChoices: [
            "Choice1", "Choice2", "Choice3", "Choice4"
        ],
        answer: "answer",
    }, 
    {
        question: "Question",
        answerChoices: [
            "Choice1", "Choice2", "Choice3", "Choice4"
        ],
        answer: "answer"
    }
];

var buttonArr = [];

function startQuiz() {
    quizTimer();

    for(let i = 0; i < 4; i++) {
        buttonArr.push($('<button>').addClass('buttons'));
        $('<li>').addClass('answer').append(buttonArr[i]);

        console.log(buttonArr[i]);
    }

    /*var buttonArr = [];
    let i = 0;
    for(let i = 0; i < questionArr.length; i++) {
        questionHeadder.text(questionArr[i].question);


        for(let j = 0; j < questionArr[i].answerChoices.length; j++) {
            answerList.append($('<li>').addClass('answer').append($('<button>').addClass('buttons').text(questionArr[i].answerChoices[j])));
        }

    }

    console.log("This should be second");*/
}

function nextQuestion(arrayPar) {
    questionHeadder.text();
}

var timeLeft = 75;

function quizTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        $('#timer-number').text(timeLeft);
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
        }
    
      }, 1000);
}


startBtn.on('click', function() {
    console.log("This prints when the button is clicked");

    startBtn.css('display', 'none');
    instructions.css('display', 'none');
    startTitle.css('display', 'none');

    startQuiz();
    
});