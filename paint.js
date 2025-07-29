// paint.js

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все элементы
  const canvas      = document.getElementById('rod-canvas');
  const brushBtn    = document.getElementById('brush-btn');
  const clearBtn    = document.getElementById('clear-btn');
  const colorPicker = document.getElementById('brush-color');
  const minusBtn    = document.getElementById('thickness-minus');
  const plusBtn     = document.getElementById('thickness-plus');
  const sizeDisplay = document.getElementById('brush-size-value');

  if (!canvas || !brushBtn || !clearBtn || !colorPicker) {
    console.error("paint.js: не все элементы найдены в DOM");
    return;
  }

  const ctx = canvas.getContext('2d');

  let painting   = false;
  let brushSize  = 10;
  // кисточка включена по умолчанию
  let brushActive = true;
  brushBtn.textContent = 'Кисточка: Вкл';

  // Устанавливаем начальное отображение толщины
  sizeDisplay.textContent = brushSize;

  // Подгоняем внутренний буфер canvas под его CSS‑размер
  function resizeCanvas() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width  = w;
    canvas.height = h;
  }

  window.addEventListener('load', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);

  // Уменьшаем толщину
  minusBtn.addEventListener('click', () => {
    brushSize = Math.max(1, brushSize - 1);
    sizeDisplay.textContent = brushSize;
  });

  // Увеличиваем толщину
  plusBtn.addEventListener('click', () => {
    brushSize++;
    sizeDisplay.textContent = brushSize;
  });

  // Включаем/выключаем кисточку
  brushBtn.addEventListener('click', () => {
    brushActive = !brushActive;
    brushBtn.textContent = brushActive ? 'Кисточка: Вкл' : 'Кисточка: Выкл';
  });

  // Очистка рисунка (не фона)
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Начало штриха
  canvas.addEventListener('mousedown', e => {
    if (!brushActive) return;
    painting = true;
    ctx.beginPath();
    ctx.lineWidth   = brushS
