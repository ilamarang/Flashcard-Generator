var inquirer = require('inquirer');
var fs = require('fs');
var questions = require('./questions.js')
var quitGame = false;
var basicCard = require('./basicCard.js')
var clozeCard = require('./clozeCard.js')


var initialQuestions = function() {
      inquirer.prompt(questions.prompt.initialQuestions).then(function(answer) {
            //Make a decision based on the answer.
            switch (answer.startGameQuestions) {
                case 'Create a Basic Card':
                    //Create a new Basic Card Constructor
                    //createBasicCard();
                    createCard('Basic',questions.prompt.clozeCardFullQuestion,questions.prompt.basicCardBackQuestion,basicCard);
                    break;
                default:
                    console.log('Poor Choice');
                    quitGame = true;
            }

        }
    )
}


//A generic function to create Basic or Cloze card
var createCard = function(cardType,firstQuestion,secondQuestion,cardObject) {
  inquirer.prompt(firstQuestion).then(function(firstAnswer)
  {
    inquirer.prompt(secondQuestion).then(function(secondAnswer)
    {
      //verify if the question and answer is related.
      var newCard = new cardObject(firstAnswer,secondAnswer);

 })

}) }


initialQuestions();
