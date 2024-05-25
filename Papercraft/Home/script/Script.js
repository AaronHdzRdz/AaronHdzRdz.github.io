const wavePath = document.querySelector("#wave path");
const duration = 2000; 
let currentState = 0;

const waveStates = [
 [
   { x: 64.33, y: 10 },
   { x: 134.23, y: 60 },
   { x: 200, y: 20 }, 
   { x: 278.35, y: 45 },
   { x: 362.89, y: 15 }
 ],
 [
   { x: 64.33, y: 60 },
   { x: 134.23, y: 10 },
   { x: 200, y: 20 },
   { x: 278.35, y: 40 },
   { x: 362.89, y: 20 }
 ],
 [
   { x: 64.33, y: 60 },
   { x: 134.23, y: 10 },
   { x: 200, y: 40 },
   { x: 278.35, y: 25 },
   { x: 362.89, y: 60 }
 ],
];

function interpolateValues(from, to, progress) {
  return from + (to - from) * progress;
}

function updatePath(progress) {
  const from = waveStates[currentState];
  const to = waveStates[(currentState + 1) % waveStates.length];
  const points = from.map((point, index) => {
    return {
      x: interpolateValues(point.x, to[index].x, progress),
      y: interpolateValues(point.y, to[index].y, progress)
    };
  });

  const fixedStart = { x: 0, y: 65.69 };
  const fixedEnd = { x: 362.89, y: 65.69 };

  const pathData = `
    M0,${points[0].y}
    C${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}
    S${points[3].x},${points[3].y} ${points[4].x},${points[4].y}
    V${fixedEnd.y} H0 Z
  `;
  wavePath.setAttribute("d", pathData);
}

function animateWave(timestamp) {
  const startTime = performance.now();
  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    updatePath(progress);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      currentState = (currentState + 1) % waveStates.length;
      animateWave();
    }
  }
  requestAnimationFrame(frame);
}

animateWave();

const reveals = document.querySelectorAll('.reveal');
let revealed = [];

window.addEventListener('scroll', () => {
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.offsetTop;
    const revealHeight = reveal.offsetHeight;

    if (window.scrollY + windowHeight >= revealTop && window.scrollY + windowHeight <= revealTop + revealHeight) {
      if (!revealed.includes(reveal)) {
        reveal.classList.add('active');
        revealed.push(reveal);
      }
    }
  });
});
const reveals2 = document.querySelectorAll('.reveal');
let revealed2 = [];
const scrollMessage = document.querySelector('#scroll-message');

window.addEventListener('scroll', () => {
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.offsetTop;
    const revealHeight = reveal.offsetHeight;

    if (window.scrollY + windowHeight >= revealTop && window.scrollY + windowHeight <= revealTop + revealHeight) {
      if (!revealed.includes(reveal)) {
        reveal.classList.add('active');
        revealed.push(reveal);
        scrollMessage.classList.add('hide');
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var nombre = document.getElementById("nombre");
  nombre.innerHTML = "Paper Craft Aaran"; // Reemplaza "Tu Nombre" con tu nombre real
  nombre.style.borderRight = "none"; // Elimina el borde derecho (cursor) al finalizar la animación
});
