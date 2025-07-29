// paint.js — без изменений

const canvas         = document.getElementById('rod-canvas');
const ctx            = canvas.getContext('2d');
const brushBtn       = document.getElementById('brush-btn');
const clearBtn       = document.getElementById('clear-btn');
const colorPicker    = document.getElementById('brush-color');
const minusBtn       = document.getElementById('thickness-minus');
const plusBtn        = document.getElementById('thickness-plus');
const sizeDisplay    = document.getElementById('brush-size-value');

let painting    = false;
let brushActive = false;
let brushSize   = 10;

function resizeCanvas() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width  = w;
  canvas.height = h;
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

minusBtn.addEventListener('click', () => {
  brushSize = Math.max(1, brushSize - 1);
  sizeDisplay.textContent = brushSize;
});
plusBtn.addEventListener('click', () => {
  brushSize++;
  sizeDisplay.textContent = brushSize;
});

brushBtn.addEventListener('click', () => {
  brushActive = !brushActive;
  brushBtn.textContent = brushActive ? 'Кисточка: Вкл' : 'Кисточка: Выкл';
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', e => {
  if (!brushActive) return;
  painting = true;
  ctx.beginPath();
  ctx.lineWidth   = brushSize;
  ctx.lineCap     = 'round';
  ctx.strokeStyle = colorPicker.value;
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', e => {
  if (!painting) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

['mouseup','mouseleave'].forEach(evt =>
  canvas.addEventListener(evt, () => painting = false)
);
