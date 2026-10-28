
const questions = [
  {
    question: "What did I think when I first saw u?",
    options: [
      "She looks familiar",
      "OMGGGGGG she's soooo prettyyyyy and beautifulllll baddieeeeeee",
      "She seems funny",
      "I didn't notice anything"
    ],
    correct: 1
  },
  {
    question: "Who loves who more?",
    options: [
      "You love me more",
      "i love you more",
      "We love each other equally",
      "Nobody knows 😭"
    ],
    correct: 1
  },
  {
    question: "What did we tell each other before we told ily to each other?",
    options: [
      "I miss you",
      "i like you",
      "You're cute",
      "I love hanging out with you"
    ],
    correct: 1
  },
  {
    question: "Which was our first movie?",
    options: [
      "Spider Man",
      "Michael",
      "Odeyssey",
      "Cars"
    ],
    correct: 0 // Change this number to the correct option's index
  },
  {
    question: "Where was our first hug?",
    options: [
      "A block terrace",
      "B block terrace",
      "Admin block",
      "Classroom"
    ],
    correct: 0 // Change this number to the correct option's index
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showPage("quiz-page");
  displayQuestion();
}

function displayQuestion() {
  answered = false;

  const questionData = questions[currentQuestion];

  document.getElementById("question-number").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById("question").textContent =
    questionData.question;

  document.getElementById("progress-bar").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-button").hidden = true;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "option-button";
    button.textContent = option;
    button.onclick = () => selectAnswer(index, button);

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;

  const questionData = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-button");
  const feedback = document.getElementById("feedback");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === questionData.correct) {
    score++;
    selectedButton.classList.add("correct");
    feedback.textContent = "YAYYYYY, that's right babyyyy! 💗";
  } else {
    selectedButton.classList.add("incorrect");
    buttons[questionData.correct].classList.add("correct");
    feedback.textContent = "Heheee, not quiteee! Look at the green one, kanna 💕";
  }

  document.getElementById("progress-bar").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  const nextButton = document.getElementById("next-button");
  nextButton.hidden = false;

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See my score 💖"
      : "Next question 💕";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    document.getElementById("score-text").textContent =
      `You got ${score} out of ${questions.length} questions right! 💗`;

    showPage("quiz-result");
  }
}

function showSurprise() {
  const surprise = document.getElementById("final-surprise");
  surprise.hidden = false;
  surprise.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function toggleMusic() {
  const song = document.getElementById("our-song");
  const button = document.getElementById("music-button");

  if (song.paused) {
    try {
      await song.play();
      button.textContent = "⏸ Pause our song";
    } catch (error) {
      button.textContent = "🎵 Tap to play our song";
      alert("Make sure song.mp3 is inside your photos folder, kanna! 💗");
    }
  } else {
    song.pause();
    button.textContent = "🎵 Play our song";
  }
}
