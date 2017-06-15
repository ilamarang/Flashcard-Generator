//All questions will be maintained using this file and appropriately exported.
exports.prompt = {
initialQuestions: [{
    name: 'startGameQuestions',
    message: 'Please select an option to start using this App',
    type: 'list',
    choices: ['1. Create a Basic Card', '2. Create a Cloze Card', '3. Play with Basic Cards', '4. Play with Cloze Cards',
        '5. Play with Basic and Cloze cards', '6. Display Cards', '7. Quit Application'
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
