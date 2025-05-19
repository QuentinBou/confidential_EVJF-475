let percent = 0;
let animationFrameId;

const body = document.getElementById('body')
const percentText = document.getElementById("percent");
const progressCircle = document.getElementById("progress");
const loader = document.querySelector(".loading-container");
const music = document.getElementById("bg-music");
const enterBtn = document.getElementById("enter-btn");
const entryScreen = document.getElementById("entry-screen");
const canvas = document.getElementById("glitch-canvas");
const ctx = canvas.getContext("2d");
const folderImg = document.getElementById("folderImg");
const paper = document.getElementById("paper");
const airship = document.getElementById("airship")
const arrowContainer = document.getElementById("arrowContainer")
const arrow = document.getElementById('arrow')
const infos = document.getElementById('infos')
const target = document.getElementById("typewriter");

const totalLength = 2 * Math.PI * 90;
const text = "Fin de communication...";
let index = 0;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function startLoading() {
  let percent = 0;
  const percentText = document.getElementById("percent");
  const progressCircle = document.getElementById("progress");
  const totalLength = 2 * Math.PI * 90;

  const interval = setInterval(() => {
    percent++;
    percentText.textContent = percent + "%";
    const offset = totalLength - (totalLength * percent) / 100;
    progressCircle.style.strokeDashoffset = offset;

    if (percent >= 100) {
      clearInterval(interval);
      loader.classList.add("fade-out");
      setTimeout(() => {
        stopGlitchCanvas();
      }, 800);
    }
  }, 20);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function glitchEffect() {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const w = Math.random() * 200;
    const h = Math.random() * 10 + 1;
    const r = Math.floor(200 + Math.random() * 55);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
    ctx.fillRect(x, y, w, h);
  }

  animationFrameId = requestAnimationFrame(glitchEffect);
}

function stopGlitchCanvas() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.style.display = "none";
  canvas.remove();
  loader.remove();
  folderImg.style.display = "block";
  setTimeout(() => {
    folderImg.classList.add("fade-in");
  }, 500);
}

function handleArrowClick() {
  paper.classList.remove('show')
  paper.classList.add('fade-out')
  setTimeout(() => {
    airship.style.display = "none";
    infos.style.display = "none";
    arrowContainer.style.display = "none";
    paper.style.display = "none";
    typeLetter()
  }, 1200);
}

function typeLetter() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetter, 200);
  } else {
    target.style.animation = "none";
    target.style.border = "none";
  }
}

function showPaper() {
  paper.classList.add("show");
  body.style.overflow = "none";
}

enterBtn.addEventListener("click", () => {
  entryScreen.style.display = "none";
  loader.style.display = "flex";
  music.play().catch((err) => console.warn("Autoplay bloqué :", err));
  startLoading();
});

folderImg.addEventListener("click", () => {
    folderImg.classList.add("slide-out")
    setTimeout(() => {
      folderImg.style.display = "none";
      paper.style.display = "flex";
      body.style.overflow = "visible";
      setTimeout(() => {
        showPaper()
      }, 200);
    }, 1000);
})

arrow.addEventListener("click", handleArrowClick)

scrollToTop()
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

glitchEffect();
