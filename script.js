let modoOscuro = document.getElementById("modoOscuroBtn");
modoOscuro.addEventListener("click", function() {
    document.body.classList.toggle("oscuro");
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let figuraX, figuraY, figuraRadio, colorFigura;
let puntaje = 0;
let record = 0;
let tiempo = 10;
let intervalo;

function dibujarFiguraJuego() {
  figuraRadio = Math.floor(Math.random() * 40) + 10;
  figuraX = Math.random() * (canvas.width - 2 * figuraRadio) + figuraRadio;
  figuraY = Math.random() * (canvas.height - 2 * figuraRadio) + figuraRadio;
  colorFigura = Math.random() < 0.5 ? "red" : "blue";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(figuraX, figuraY, figuraRadio, 0, Math.PI * 2);
  ctx.fillStyle = colorFigura;
  ctx.fill();
}

function iniciarJuego() {
  puntaje = 0;
  tiempo = 10;
  document.getElementById("puntaje").textContent = puntaje;
  document.getElementById("tiempo").textContent = tiempo;
  document.getElementById("record").style.color = "";

  dibujarFiguraJuego();

  clearInterval(intervalo);
  intervalo = setInterval(() => {
    tiempo--;
    document.getElementById("tiempo").textContent = tiempo;

    if (tiempo <= 0) {
      clearInterval(intervalo);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "gray";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("¡Fin del juego!", canvas.width / 2, canvas.height / 2);
    }
  }, 1000);
}

canvas.addEventListener("mousedown", function (e) {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const distancia = Math.sqrt((clickX - figuraX) ** 2 + (clickY - figuraY) ** 2);

  if (tiempo <= 0) return;

  if (distancia <= figuraRadio) {
    if ((colorFigura === "red" && e.button === 0) || (colorFigura === "blue" && e.button === 2)) {
      puntaje++;
    } else {
      puntaje = Math.max(0, puntaje - 1);
    }

    document.getElementById("puntaje").textContent = puntaje;

    if (puntaje > record) {
      record = puntaje;
      const recordSpan = document.getElementById("record");
      recordSpan.textContent = record;
      recordSpan.style.color = "limegreen";
    }

    dibujarFiguraJuego();
  }
});

canvas.addEventListener("contextmenu", e => e.preventDefault());