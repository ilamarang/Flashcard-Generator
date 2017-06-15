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
    name: 'firstInputAnswer',
    message: 'what do you want on the front of the card ?',
    type: 'input'
  }],
basicCardBackQuestion: [{
    name: 'secondInputAnswer',
    message: 'what do you want on the back of the card ?',
    type: 'input'
  }],
clozeCardFullQuestion : [{
    name: 'firstInputAnswer',
    message: 'Please enter the full sentence?',
    type: 'input'
  }],
clozeCardClozeQuestion: [{
    name: 'secondInputAnswer',
    message: 'Please enter the text that you want to hide ?',
    type: 'input'
  }],
continueQuestion: [{
      name: 'userResponse',
      message: 'Do you want to continue?',
      type: 'list',
      choices: ['Yes','No']

  }]
}
