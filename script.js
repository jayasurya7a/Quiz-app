const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const options=document.querySelectorAll(".option");
console.log(options);

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
    swal("Good job!", "You rocked the quiz!", "success");
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    startButton.style.color="black"
    startButton.style.backgroundColor="gold"
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
    element.classList.add('disable');
  } else {
    element.classList.add('wrong');
    element.classList.add('disable');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  element.classList.remove('disable');
}

const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { text: 'Strings', correct: false },
      { text: 'Alerts', correct: true },
      { text: 'Booleans', correct: false},
      { text: 'Numbers', correct: false}
    
    ]
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: [
      { text: 'Strings', correct: false },
      { text: 'Booleans', correct: false},
      { text: 'Other Arrays', correct: false },
      { text: 'All the above', correct: true }
    ]
  },
  {
    question: ' How can you add a single line comment in a JavaScript?',
    answers: [
      { text: '<!--Comment-->', correct: false },
      { text: '\'Comment', correct: false },
      { text: '//Comment', correct: true },
      { text: 'None are correct', correct: false }
    ]
  },
  {
    question: 'How do you round a number to its nearest integer?',
    answers: [
      { text: 'Math.round()', correct: true },
      { text: 'round.Math()', correct: false },
      { text: 'Math.rnd()', correct: false },
      { text: 'rnd.Math()', correct: false }
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
