const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { text: 'Strings', correct: false },
      { text: 'Booleans', correct: false },
      { text: 'Alerts', correct: true},
      { text: 'Numbers', correct: false}
    
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: [
      { text: 'Numbers and Strings', correct: false },
      { text: 'Other Arrays', correct: false},
      { text: 'Booleans', correct: false },
      { text: 'All of the above', correct: true }
    ]
  },
  {
    question: ' How can you add a single line comment in a JavaScript?',
    answers: [
      { text: '<!--Comment-->', correct: false },
      { text: '\'Comment', correct: false },
      { text: '//Comment', correct: true },
      { text: 'None of the Above', correct: false }
    ]
  },
  {
    question: 'How do you round the number 7.25, to the nearest integer?',
    answers: [
      { text: 'Math.round(7.25)', correct: true },
      { text: 'rnd(7.25)', correct: false },
      { text: 'Math.rnd(7.25)', correct: false },
      { text: 'round(7.25)', correct: false }
    ]
  },
  {
    question: 'Which operator is used to assign a value to a variable?',
    answers: [
      { text: '-', correct: false },
      { text: '*', correct: false },
      { text: '=', correct: true },
      { text: 'X', correct: false }
    ]
  }

]