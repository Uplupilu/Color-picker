// paint.js

// Находим элементы
const canvas     = document.getElementById('rod-canvas');
const ctx        = canvas.getContext('2d');
const brushBtn   = document.getElementById('brush-btn');
const clearBtn   = document.getElementById('clear-btn');
const colorPicker= document.getElementById('brush-color');

let painting     = false;
let brushActive  = false;

// Функция синхронизации внутреннего буфера canvas
function resizeCanvas() {
  // Получаем отображаемый размер
  const rect = canvas.getBoundingClientRect();
  // Устанавливаем реальные атрибуты width/height
  canvas.width  = rect.width;
  canvas.height = rect.height;
  // (При изменении размеров контент стирается, но фон-изображение через CSS остаётся)
}

// Настраиваем ресайз при загрузке и при изменении окна
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Переключаем режим кисточки
brushBtn.addEventListener('click', () => {
  brushActive = !brushActive;
  brushBtn.textContent = brushActive ? 'Кисточка: Вкл' : 'Кисточка: Выкл';
});

// Очистка рисунка (только нарисованного контента)
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Начало штриха
canvas.addEventListener('mousedown', (e) => {
  if (!brushActive) return;
  painting = true;
  ctx.beginPath();
  ctx.lineWidth   = 10;                       // толщина кисти
  ctx.lineCap     = 'round';                  // круглые концы
  ctx.strokeStyle = colorPicker.value;        // текущий цвет
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Рисуем при движении мыши
canvas.addEventListener('mousemove', (e) => {
  if (!painting) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

// Окончание штриха
canvas.addEventListener('mouseup', () => {
  painting = false;
});
canvas.addEventListener('mouseleave', () => {
  painting = false;
});
