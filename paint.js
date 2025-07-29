const canvas = document.getElementById('rod-canvas');
const ctx = canvas.getContext('2d');
const brushBtn = document.getElementById('brush-btn');
const clearBtn = document.getElementById('clear-btn');
const colorPicker = document.getElementById('brush-color');

let painting = false;
let brushActive = false;

// Переключаем режим кисточки
brushBtn.addEventListener('click', () => {
  brushActive = !brushActive;
  brushBtn.textContent = brushActive ? 'Кисточка: Вкл' : 'Кисточка: Выкл';
});

// Очистка рисунка (не фона!)
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Начало рисования
canvas.addEventListener('mousedown', (e) => {
  if (!brushActive) return;
  painting = true;
  ctx.beginPath();
  ctx.lineWidth = 10;               // толщина кисти
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Рисуем по движению мыши
canvas.addEventListener('mousemove', (e) => {
  if (!painting) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

// Окончание рисования
canvas.addEventListener('mouseup', () => {
  painting = false;
});
canvas.addEventListener('mouseleave', () => {
  painting = false;
});
