// paint.js

const canvas      = document.getElementById('rod-canvas');
const ctx         = canvas.getContext('2d');
const brushBtn    = document.getElementById('brush-btn');
const clearBtn    = document.getElementById('clear-btn');
const colorPicker = document.getElementById('brush-color');

let painting    = false;
let brushActive = false;

/**
 * «Принудительно» подгоняем внутренний буфер canvas под его
 * текущий CSS-размер (включая box-sizing:border-box).
 */
function resizeCanvas() {
  // clientWidth/Height учитывают box-sizing:border-box
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width  = w;
  canvas.height = h;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Включение/выключение кисточки
brushBtn.addEventListener('click', () => {
  brushActive = !brushActive;
  brushBtn.textContent = brushActive ? 'Кисточка: Вкл' : 'Кисточка: Выкл';
});

// Очистить нарисованное
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Мышь нажата — начинаем штрих
canvas.addEventListener('mousedown', e => {
  if (!brushActive) return;
  painting = true;
  ctx.beginPath();
  ctx.lineWidth   = 10;
  ctx.lineCap     = 'round';
  ctx.strokeStyle = colorPicker.value;
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Мышь двигается — рисуем
canvas.addEventListener('mousemove', e => {
  if (!painting) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

// Мышь отпущена или ушла с области — заканчиваем штрих
['mouseup','mouseleave'].forEach(evt => 
  canvas.addEventListener(evt, () => painting = false)
);
