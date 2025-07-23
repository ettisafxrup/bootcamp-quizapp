const questions = [
  {
    question: "মারুফের আম্মুর ছোট ছেলের নাম কি?",
    options: ["মারুফ", "কাসিব", "হুমাইরা", "জান্নাতুল"],
    answer: "কাসিব",
  },
  {
    question: "মুরগীর কাবাব ৫০ টাকা পিস হলে তোমার প্রেমিকার নাম কি?",
    options: ["সিনথিয়া", "সাদিয়া", "তিশা", "সামিয়া"],
    answer: "তিশা",
  },
  {
    question: "সামিরার বরের নাম কি?",
    options: ["দ্বীপ", "হাসনায়েন", "আরাফ", "আসাফ"],
    answer: "হাসনায়েন",
  },
  {
    question: "আপনি ভবিষ্যতে কয়টি বাবু নেওয়ার পরিকল্পনা করছেন?",
    options: ["১", "২", "৩", "আল্লাহ যতগুলা দিবেন, ইনশা আল্লাহ ততগুলা"],
    answer: "আল্লাহ যতগুলা দিবেন, ইনশা আল্লাহ ততগুলা",
  },
]

// Grabbing HTML Elements

const questionTitile = document.getElementById("question") // Title
const optionsList = document.getElementById("options") // Options Box
const quizContainer = document.getElementsByClassName("quiz-container")[0] // Question Container

const messageText = document.getElementById("message") // Showing Messages
const nextButton = document.getElementById("next-btn") // Skip Button

let questionNumber = 0 // Starting Point
let score = 0 // Score
let attemped = false // if user has already attemped the question

// Event Listeners
nextButton.addEventListener("click", () => {
  questionNumber++
  attemped = false
  loadQuestion()
})

// Functions
// Manages the Options, Checks if the user has already attemped the question and moves to the next question
function getSelectedOption(index) {
  nextButton.classList.add("disable-button")
  nextButton.disabled = true

  if (attemped == true)
    return alert("You have already attemped this question, move on to the Next")

  if (
    questions[questionNumber].options[index] == questions[questionNumber].answer
  ) {
    messageText.innerText = "Correct Answer! Moving to the Next Question..."
    messageText.style.color = "green"

    questions[questionNumber].options[index] =
      "✅ " + questions[questionNumber].options[index]
    score++
    loadQuestion()
  } else {
    messageText.innerText = "Wrong Answer! Moving to the Next Question..."
    messageText.style.color = "red"

    questions[questionNumber].options[index] =
      "❌ " + questions[questionNumber].options[index]
    loadQuestion()
  }

  setTimeout(() => {
    questionNumber++
    attemped = false
    messageText.innerText = ""
    loadQuestion()
    nextButton.classList.remove("disable-button")
    nextButton.disabled = false
  }, 3000)

  attemped = true
}

// for Loading starting/new Question
function loadQuestion() {
  if (questionNumber == questions.length) {
    viewResult()
    return 0
  }

  questionTitile.innerText = questions[questionNumber].question
  optionsList.innerHTML = `
<li onclick="getSelectedOption(0)"> ${questions[questionNumber].options[0]}</li>
<li onclick="getSelectedOption(1)"> ${questions[questionNumber].options[1]}</li>
<li onclick="getSelectedOption(2)"> ${questions[questionNumber].options[2]}</li>
<li onclick="getSelectedOption(3)"> ${questions[questionNumber].options[3]}</li>
`
}

// views the result if questions are finished or times up
function viewResult() {
  quizContainer.innerHTML = `
        <h1>Times Up!</h1>
        <p>Score: ${score}</p>
        ${
          score >= questions.length * 0.4
            ? `<button
              id="next-btn"
              onclick="location.href='https://github.com/ettisafxrup'"
            >
              🎓 Claim Certificate!
            </button>`
            : `<button id="next-btn" onclick="location.reload()">
              🙏 Retake Exam!
            </button>`
        }
        `
}
loadQuestion()

// Timers
const timeViewer = document.getElementById("time")

const examTime = 30
timeViewer.textContent = examTime

setInterval(() => {
  timeViewer.textContent -= 1

  if (timeViewer.textContent == "0") {
    viewResult()
  }
}, 1000)
