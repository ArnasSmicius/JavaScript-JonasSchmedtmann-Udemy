var questions = [];
var play = true;
var score = 0;

function Question(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.printQuestion = function() {
        console.log(this.question);
        for(var i = 0 ; i < this.answers.length ; i++) {
            console.log((i + 1) + ": " + this.answers[i]);
        }
    }
    this.checkForAnswer = function(chosenAnswer) {
        if(chosenAnswer == this.correctAnswer) {
            console.log("Correct answer!");
            score++;
        } else if (chosenAnswer == "exit") {
            play = false;
        } else {
            console.log("You are wrong!");
        }
        console.log("Score: " + score)
        console.log("===================================");
    }
}

var addQuestion = function(question, answers, correctAnswer) {
    questions.push(new Question(question, answers, correctAnswer))
}

addQuestion("Which programming language is the best?", ["Java", "JavaScript", "C#"], 2);
addQuestion("What's the name of the instructor?", ["Petras", "Jonas", "Ona"], 2);

var printRandomQuestion = function() {
    var number = Math.floor(Math.random() * questions.length);
    questions[number].printQuestion();
    questions[number].checkForAnswer(prompt());
}

while(play) {
    printRandomQuestion();
}
