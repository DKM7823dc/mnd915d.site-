const questions = [
  {
    text: "Junte-se a nós. Que tipo de ajuda você precisa?",
 options: [
  "Saya ingin belajar investasi saham.",
  "Dapatkan analisis saham",
  "Pelajari tentang saham",
  "Akses saham premium",
  "Dapatkan saran investasi"
],
  }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;

const progressBar = document.getElementById("progressBar");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const quizContent = document.getElementById("quizContent");
const modal = document.getElementById("resultModal");

function loadQuestion() {
  const q = questions[currentQuestionIndex];

  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
  questionText.textContent = q.text;

  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercent}%`;

  optionsContainer.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<div class="option-circle"></div>${opt}`;
    btn.onclick = () => handleSelection(btn);
    optionsContainer.appendChild(btn);
  });

  quizContent.classList.remove("fade-out");
}

function handleSelection(btn) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((b) => (b.style.pointerEvents = "none"));
  btn.classList.add("selected");

  setTimeout(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      quizContent.classList.add("fade-out");
      setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
        allBtns.forEach((b) => (b.style.pointerEvents = "auto"));
      }, 300);
    } else {
      showResultModal();
    }
  }, 400);
}

function showResultModal() {
  modal.classList.add("active");

  setTimeout(() => {
    document.getElementById("loadingState").style.display = "none";
    document.getElementById("successState").style.display = "block";
    document.querySelector(".modal-check").classList.add("visible");
  }, 1500);
}

loadQuestion();
