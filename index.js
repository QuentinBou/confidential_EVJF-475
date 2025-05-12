let percent = 0;
let animationFrameId;

const percentText = document.getElementById("percent");
const progressCircle = document.getElementById("progress");
const loader = document.querySelector(".loading-container");
const music = document.getElementById("bg-music");
const enterBtn = document.getElementById("enter-btn");
const entryScreen = document.getElementById("entry-screen");
const canvas = document.getElementById("glitch-canvas");
const ctx = canvas.getContext("2d");
const folderImg = document.getElementById("folderImg");

const totalLength = 2 * Math.PI * 90;

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

enterBtn.addEventListener("click", () => {
  entryScreen.style.display = "none";
  loader.style.display = "flex";
  music.play().catch((err) => console.warn("Autoplay bloqué :", err));
  startLoading();
});

folderImg.addEventListener("click", (event) => {
    console.log(event)
    folderImg.classList.add("slide-out")
})

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

glitchEffect();
