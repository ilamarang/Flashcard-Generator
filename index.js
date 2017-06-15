var inquirer = require('inquirer');
var fs = require('fs');
var questions = require('./questions.js');
var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var dataStore = require('./dataStore.json');
var colors = require('colors');
var cardCount = 0;
var flashCardArray = [];

var initialQuestions = function() {
      inquirer.prompt(questions.prompt.initialQuestions).then(function(answer) {
            //Make a decision based on the answer.
            switch (answer.startGameQuestions) {
                case 'Create a Basic Card':
                    //Create a new Basic Card using the appropriate Constructor
                    createCard('Basic',questions.prompt.basicCardFrontQuestion,questions.prompt.basicCardBackQuestion,basicCard);
                    break;
                case 'Create a Cloze Card':
                        //Create a Cloze Card using the appropriate Constructor
                        createCard('Cloze',questions.prompt.clozeCardFullQuestion,questions.prompt.clozeCardClozeQuestion,clozeCard);
                        break;
                 case 'Play using Basic Cards':
                        getCards('Basic');
                        playFlashCard('Basic');
                        break;
                  case 'Play using Cloze Cards':
                               getCards('Cloze');
                               playFlashCard('Cloze');
                               break;
                default:
                    //Write the choice to Log Writer and exit the game
                    console.log('Poor Choice');
                    return;
            }


        }
    )

}

var getCards = function(cardType) {
  //Reset the Flash Card Array
  flashCardArray = [];
  cardCount = 0;
  dataStore.forEach(function(card,index) {
    if(card.type===cardType) {
        flashCardArray.push(card);
    }
  });

}

var playFlashCard = function(cardType) {

if (cardCount < flashCardArray.length)
{
  card = flashCardArray[cardCount];
  var systemQuestion = (cardType==='Basic') ? card.front: card.partial;
  var systemAnswer = (cardType==='Basic') ? card.back: card.cloze;
  inquirer.prompt([
          {
              type: 'input',
              message: systemQuestion,
              name: 'userTypedAnswer'
          }
      ]).then(function (answer) {
        if(answer.userTypedAnswer != systemAnswer) {
          console.log(colors.red('\u2717' + '  Wrong Answer!'));
          console.log(colors.yellow('\u2713' + '  Correct Answer:  ' + systemAnswer));
        } else {
          console.log(colors.green('\u2713' +  '  You are correct!'));
        }
        cardCount +=1;
        playFlashCard(cardType);
})
}



 }
//A generic function to create Basic or Cloze card
var createCard = function(cardType,firstQuestion,secondQuestion,cardObject) {
  inquirer.prompt(firstQuestion).then(function(firstAnswer)
  {
    inquirer.prompt(secondQuestion).then(function(secondAnswer)
    {
      //verify if the question and answer is related.
      var newCard = new cardObject(firstAnswer.firstInputAnswer,secondAnswer.secondInputAnswer);
      dataStore.push(newCard);

      fs.writeFile('./dataStore.json',JSON.stringify(dataStore, null, 2),function(err) {

        if(err) {
          //Write error to Log Writer

        }else {
          inquirer.prompt(questions.prompt.continueQuestion).then(function(continueAnswer)
          {
            if(continueAnswer.userResponse==='Yes') {
                createCard(cardType,firstQuestion,secondQuestion,cardObject);
            } else {
              initialQuestions();
            }
          });
        }
      });

 })

}) }


initialQuestions();
