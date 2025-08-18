// app.js

document.addEventListener("DOMContentLoaded", () => {
  // === 1. Переменные и элементы ===
  const threadsArray = threads; // берём прямо из colors.js
  const threadsArray = threads;   // из colors.js
  const listEl       = document.getElementById("thread-list");
  const addThreadBtn = document.getElementById("add-thread-btn");
  const addBtn       = document.getElementById("add-thread-btn");
  const delBtn       = document.getElementById("delete-thread-btn");
  const colorPicker  = document.getElementById("brush-color");
  const brushBtn     = document.getElementById("brush-btn");
  const clearBtn     = document.getElementById("clear-btn");
  const minusBtn     = document.getElementById("thickness-minus");
  const plusBtn      = document.getElementById("thickness-plus");
  const sizeDisplay  = document.getElementById("brush-size-value");
  const sizeDisp     = document.getElementById("brush-size-value");
  const canvas       = document.getElementById("rod-canvas");
  const ctx          = canvas.getContext("2d");

  let selectedIndex = null;      // для выбора одной нити
  let selectedIndex = null;
  let painting      = false;
  let brushSize     = parseInt(sizeDisplay.textContent) || 10;
  let brushSize     = parseInt(sizeDisp.textContent) || 10;
  let brushActive   = true;

  // Инициализация текста кнопки
  // Стартовое состояние
  brushBtn.textContent = "Кисточка: Вкл";
  sizeDisplay.textContent = brushSize;
  sizeDisp.textContent = brushSize;
  updateDeleteBtn();

  // === 2. Функции рендера нитей ===
  // Подгонка canvas под CSS‑размер
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  // Обновляем состояние кнопки «Удалить»
  function updateDeleteBtn() {
    delBtn.disabled = (selectedIndex === null);
  }

  // Рендер карточек
  function renderThreads() {
    listEl.innerHTML = "";
    threadsArray.forEach((thread, idx) => {
    threadsArray.forEach((t, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      if (idx === selectedIndex) card.classList.add("selected");

      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = thread.hex;
      card.appendChild(colorBox);
      const box = document.createElement("div");
      box.className = "color-box";
      box.style.backgroundColor = t.hex;
      card.appendChild(box);

      const info = document.createElement("div");
      info.innerHTML = `<strong>${thread.brand}</strong><br>Код: ${thread.code}`;
      info.innerHTML = `<strong>${t.brand}</strong><br>Код: ${t.code}`;
      card.appendChild(info);

      card.addEventListener("click", () => {
        selectedIndex = idx;
        colorPicker.value = thread.hex;
        colorPicker.value = t.hex;
        renderThreads();
        updateDeleteBtn();
      });

      listEl.appendChild(card);
    });
  }

  // === 3. Добавление новой нити ===
  addThreadBtn.addEventListener("click", () => {
  // Добавить нить
  addBtn.addEventListener("click", () => {
    const brand       = prompt("Название фирмы (brand):");
    if (!brand) return;
    const code        = prompt("Код нити:");
@@ -66,25 +82,26 @@ document.addEventListener("DOMContentLoaded", () => {
    }
    threadsArray.push({ brand, code, description, hex });
    renderThreads();
    updateDeleteBtn();
  });

  // === 4. Canvas & кисточка ===
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  // Удалить нить
  delBtn.addEventListener("click", () => {
    if (selectedIndex === null) return;
    threadsArray.splice(selectedIndex, 1);
    selectedIndex = null;
    renderThreads();
    updateDeleteBtn();
  });

  // Уменьшение/увеличение толщины
  // Уменьшить/увеличить толщину кисти
  minusBtn.addEventListener("click", () => {
    brushSize = Math.max(1, brushSize - 1);
    sizeDisplay.textContent = brushSize;
    sizeDisp.textContent = brushSize;
  });
  plusBtn.addEventListener("click", () => {
    brushSize++;
    sizeDisplay.textContent = brushSize;
    sizeDisp.textContent = brushSize;
  });

  // Вкл/выкл кисточки
@@ -93,13 +110,13 @@ document.addEventListener("DOMContentLoaded", () => {
    brushBtn.textContent = brushActive ? "Кисточка: Вкл" : "Кисточка: Выкл";
  });

  // Очистка холста
  // Очистить канвас
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Рисование
  canvas.addEventListener("mousedown", (e) => {
  // Начало рисования
  canvas.addEventListener("mousedown", e => {
    if (!brushActive) return;
    painting = true;
    ctx.beginPath();
@@ -108,15 +125,17 @@ document.addEventListener("DOMContentLoaded", () => {
    ctx.strokeStyle = colorPicker.value;
    ctx.moveTo(e.offsetX, e.offsetY);
  });
  canvas.addEventListener("mousemove", (e) => {
  // Рисуем по движению мыши
  canvas.addEventListener("mousemove", e => {
    if (!painting) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });
  ["mouseup", "mouseleave"].forEach(evt =>
    canvas.addEventListener(evt, () => (painting = false))
  // Завершение штриха
  ["mouseup","mouseleave"].forEach(evt =>
    canvas.addEventListener(evt, () => painting = false)
  );

  // === 5. Старт ===
  // Первый рендер
  renderThreads();
});
