//Import the required modules exports required to play the game.
var inquirer = require('inquirer');
var fs = require('fs');
var questions = require('./questions.js');
var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var dataStore = require('./dataStore.json');
var colors = require('colors');
var Table = require('cli-table');


//Initialize Global variables to Track the game.
var cardCount = 0;
var flashCardArray = [];

//Function to display the first set of menu items available for the user.
var initialQuestions = function() {
    inquirer.prompt(questions.prompt.initialQuestions).then(function(answer) {
        //Make a decision based on the answer.
        switch (answer.startGameQuestions) {
            case '1. Create a Basic Card':
                //Create a new Basic Card using the appropriate Constructor
                createCard('Basic', questions.prompt.basicCardFrontQuestion, questions.prompt.basicCardBackQuestion, basicCard);
                break;
            case '2. Create a Cloze Card':
                //Create a Cloze Card using the appropriate Constructor
                createCard('Cloze', questions.prompt.clozeCardFullQuestion, questions.prompt.clozeCardClozeQuestion, clozeCard);
                break;
            case '3. Play with Basic Cards':
                getCards('Basic');
                playFlashCard();
                break;
            case '4. Play with Cloze Cards':
                getCards('Cloze');
                playFlashCard();
                break;
            case '5. Play with Basic and Cloze cards':
                getCards('All');
                playFlashCard();
                break;
            case '6. Display Basic Cards':
                displayCard('Basic');
                break;
            case '7. Display Cloze Cards':
                displayCard('Cloze');
                break;
            default:
                //Write the choice to Log Writer and exit the game
                console.log('Thanks for Playing!');
                return;
        }

    })

}

var getCards = function(cardType) {
    //Reset the Flash Card Array
    flashCardArray = [];
    cardCount = 0;
    dataStore.forEach(function(card, index) {
        //Load all cards for Playing
        if (cardType === 'All') {
            flashCardArray.push(card);
        } else {
            //Load card type selected by the user.
            if (card.type === cardType) {
                flashCardArray.push(card);
            }
        }

    });

}

var displayCard = function(cardType) {
  var table = new Table({
    head: ['Question', 'Answer']
  , colWidths: [70, 20]
});
  dataStore.forEach(function(card, index) {
    //Display two columns in the table based on the card type.
    var displayArray = new Array(2);
    if (card.type === cardType) {
        if (card.type == 'Basic') {
          displayArray[0] = card.front;
          displayArray[1] = card.back;
        } else {
          displayArray[0] = card.partial;
          displayArray[1] = card.cloze;
        }

        table.push(displayArray);
    }
  })
  console.log(table.toString());
  initialQuestions();
}

var playFlashCard = function() {
    //Loop through all cards in the deck and display one question at a time.
    if (cardCount < flashCardArray.length) {
        card = flashCardArray[cardCount];
        var systemQuestion = (card.type === 'Basic') ? card.front : card.partial;
        var systemAnswer = (card.type === 'Basic') ? card.back : card.cloze;
        //Prompt user with the question based on the card selected.
        inquirer.prompt([{
            type: 'input',
            message: systemQuestion,
            name: 'userTypedAnswer'
        }]).then(function(answer) {
            if (answer.userTypedAnswer.toLowerCase() != systemAnswer.toLowerCase()) {
                console.log(colors.red('\u2717' + '  Wrong Answer!'));
                console.log(colors.yellow('\u2713' + '  Correct Answer:  ' + systemAnswer));
            } else {
                console.log(colors.green('\u2713' + '  You are correct!'));
            }
            cardCount += 1;
            playFlashCard();
        })
    } else {
        initialQuestions();
    }

}
//A generic function to create Basic or Cloze card
var createCard = function(cardType, firstQuestion, secondQuestion, cardObject) {
    inquirer.prompt(firstQuestion).then(function(firstAnswer) {
        inquirer.prompt(secondQuestion).then(function(secondAnswer) {
            //verify if the question and answer is related.
            var newCard = new cardObject(firstAnswer.firstInputAnswer, secondAnswer.secondInputAnswer);
            dataStore.push(newCard);

            fs.writeFile('./dataStore.json', JSON.stringify(dataStore, null, 2), function(err) {

                if (err) {
                    //Write error to Console
                    console.log('An error occurred during the transaction')
                } else {
                    inquirer.prompt(questions.prompt.continueQuestion).then(function(continueAnswer) {
                        if (continueAnswer.userResponse === 'Yes') {
                            createCard(cardType, firstQuestion, secondQuestion, cardObject);
                        } else {
                            initialQuestions();
                        }
                    });
                }
            });

        });

    });
}
//Start the game and display all menu items
initialQuestions();
