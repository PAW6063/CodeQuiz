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
var quizForm = $('<form>');
quizBody.append(quizForm);
var answerList = $('<ul>').addClass('button-list');
quizBody.append(answerList);

var questionArr = [
    {
        question: "Question1",
        answerChoices: [
            "Choice1.1", "Choice2.1", "Choice3.1", "Choice4.1"
        ],
        answer: "answer",
    }, 
    {
        question: "Question2",
        answerChoices: [
            "Choice1.2", "Choice2.2", "Choice3.2", "Choice4.2"
        ],
        answer: "answer"
    }
];

var timeLeft = 75;
var quizStatus = false;

function quizTimer() {
    var timerInterval = setInterval(function() {
        if(timeLeft <= 0) {
            $('#timer-number').text(0);
            clearInterval(timerInterval);
        }else {
            if(quizStatus){
                clearInterval(timerInterval);
                quizStatus = false;
            }
            $('#timer-number').text(timeLeft);
        }
        
        timeLeft--;

      }, 1000);
}

var buttonArr = [];

function startQuiz() {
    quizTimer();

    for(let i = 0; i < 4; i++) {
        buttonArr.push($('<button>').addClass('buttons answerBtn').attr('data-value', questionArr[index].answerChoices[i]));
        answerList.append($('<li>').addClass('answer').append(buttonArr[i]));

    }
}

function endQuiz(){
    quizStatus = true;
    for(let i = 0; i < buttonArr.length; i++){
        buttonArr[i].remove();
        buttonArr.pop();
        $('li').remove();
    }

    questionHeadder.text("All done!");
    quizForm.append($('<p>').addClass('formPara').text('Your final score is ' + timeLeft + '!'));
    quizForm.append($('<label>').addClass('formLabel').text('Enter initials: '));
    quizForm.append($('<input>').addClass('formInput'));
    quizForm.append($('<button>').addClass('buttons formBtn').text('Submit')); 
}

var index = 0;

function nextQuestion() {
    if(index < questionArr.length){
        questionHeadder.text(questionArr[index].question);

        for(let i = 0; i < buttonArr.length; i++){
            buttonArr[i].text(questionArr[index].answerChoices[i]);
            buttonArr[i].attr('data-value', questionArr[index].answerChoices[i]); 
        }
    }else{
        console.log("Quix is Over!");

        endQuiz();
    }
}

var initialArr = [];

function addInitial() {
    let temp = $('.formInput').val() + "-" + timeLeft;
    initialArr.push(temp);
}

clearHighscore = false;

function removeInitial(){
    let temp = initialArr.length;
    for(let i = 0; i < temp; i++) {
        if(clearHighscore) {
            initialArr.pop();
            clearHighscore = false;
        }
        $(`.formPara${i}`).remove();
    }
}

function highScore() {
    $('#timer-number').text(0);
    
    questionHeadder.text("Highscores");
    $('.formPara').remove();
    $('.formLabel').remove();
    $('.formInput').remove();
    $('.formBtn').remove();

    for(let i = 0; i < initialArr.length; i ++) {
        quizForm.append($('<p>').addClass(`formPara${i}`));
    }

    initialArr.sort(function(a, b) {
        let aa = a.split('-');
        let bb = b.split('-');

        return parseInt(bb[1]) - parseInt(aa[1]);
      });

      for(let i = 0; i < initialArr.length; i++) {
          console.log((i+1) + ". " + initialArr[i]);
          $(`.formPara${i}`).text((i + 1) + '. ' + initialArr[i]);
      }
    
      quizForm.append($('<button>').addClass('buttons goBack').text('Go Back'));
      quizForm.append($('<button>').addClass('buttons clear').text('Clear Highscores'));
}


startBtn.on('click', function() {
    timeLeft = 75;
    startBtn.css('visibility', 'hidden');
    instructions.css('visibility', 'hidden');
    startTitle.css('visibility', 'hidden');

    startQuiz();
    nextQuestion();
});

$('.button-list').on('click', '.answerBtn', function(event){
    console.log($(this).data('value'));
    let thisClick = $(this).data('value');

    if(thisClick === questionArr[index].answer){
        
    }else {
        timeLeft -= 10;
    }

    index++;
    nextQuestion();
});

$('form').on('click', '.formBtn', function(event) {
    console.log('formBtn');
    addInitial();
    highScore();
});

$('form').on('click', '.clear', function(event) {
    clearHighscore = true;
    removeInitial();
});

$('form').on('click', '.goBack', function(event) {
    $('.clear').remove();
    $('.goBack').remove();
    removeInitial();

    questionHeadder.text('');

    startBtn.css('visibility', 'visible');
    instructions.css('visibility', 'visible');
    startTitle.css('visibility', 'visible');

    index = 0;
});