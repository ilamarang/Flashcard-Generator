//All questions will be maintained using this file and appropriately exported.
exports.prompt = {
initialQuestions: [{
    name: 'startGameQuestions',
    message: 'Please select an option to start using this App',
    type: 'list',
    choices: ['Create a Basic Card', 'Create a Cloze Card', 'Play using Basic Cards', 'Play using Cloze Cards',
        'Mix Basic and Cloze', 'Display Cards', 'Shuffle All Cards', 'Quit Application'
    ]
}],
basicCardFrontQuestion: [{
    name: 'basicCardQuestionFront',
    message: 'what do you want on the front of the card ?',
    type: 'input'
  }],
basicCardBackQuestion: [{
    name: 'basicCardQuestionBack',
    message: 'what do you want on the back of the card ?',
    type: 'input'
  }],
clozeCardFullQuestion : [{
    name: 'clozeCardFullQuestion',
    message: 'Please enter the question ?',
    type: 'input'
  }],
clozeCardClozeQuestion: [{
    name: 'clozeCardClozeQuestion',
    message: 'Please enter the question ?',
    type: 'input'
  }],
continueQuestion: [{
      name: 'userResponse',
      message: 'Do you want to continue?',
      type: 'list',
      choices: ['Yes','No']
      
  }]
}
