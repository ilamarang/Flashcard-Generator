var inquirer = require('inquirer');
var fs = require('fs');
var questions = require('./questions.js');
var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var dataStore = require('./dataStore.json');

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
      dataStore.push({
        card: cardType,
        firstQuestion: firstAnswer,
        secondQuestion: secondAnswer}
      )
      fs.writeFile('./dataStore.json',JSON.stringify(dataStore, null, 2),function(err) {
        //Write error to Log Writer
        if(err) {

        }else {
          inquirer.prompt(questions.prompt.continueQuestion).then(function(continueAnswer)
          {
            if(continueAnswer.userResponse==='Yes') {
                createCard(cardType,firstQuestion,secondQuestion,cardObject);
            } else {
              return;
            }
          });
        }
      });

 })

}) }


initialQuestions();
