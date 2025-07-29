// app.js

document.addEventListener("DOMContentLoaded", () => {
  // === 1. Переменные и элементы ===
  const threadsArray = window.threads || [];
  const listEl       = document.getElementById("thread-list");
  const addThreadBtn = document.getElementById("add-thread-btn");
  const colorPicker  = document.getElementById("brush-color");
  const brushBtn     = document.getElementById("brush-btn");
  const clearBtn     = document.getElementById("clear-btn");
  const minusBtn     = document.getElementById("thickness-minus");
  const plusBtn      = document.getElementById("thickness-plus");
  const sizeDisplay  = document.getElementById("brush-size-value");
  const canvas       = document.getElementById("rod-canvas");
  const ctx          = canvas.getContext("2d");

  let selectedIndex = null;      // для выбора одной нити
  let painting      = false;
  let brushSize     = parseInt(sizeDisplay.textContent) || 10;
  let brushActive   = true;

  // Инициализация текста кнопки
  brushBtn.textContent = "Кисточка: Вкл";
  sizeDisplay.textContent = brushSize;

  // === 2. Функции рендера нитей ===
  function renderThreads() {
    listEl.innerHTML = "";
    threadsArray.forEach((thread, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      if (idx === selectedIndex) card.classList.add("selected");

      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = thread.hex;
      card.appendChild(colorBox);

      const info = document.createElement("div");
      info.innerHTML = `<strong>${thread.brand}</strong><br>Код: ${thread.code}`;
      card.appendChild(info);

      card.addEventListener("click", () => {
        selectedIndex = idx;
        colorPicker.value = thread.hex;
        renderThreads();
      });

      listEl.appendChild(card);
    });
  }

  // === 3. Добавление новой нити ===
  addThreadBtn.addEventListener("click", () => {
    const brand       = prompt("Название фирмы (brand):");
    if (!brand) return;
    const code        = prompt("Код нити:");
    if (!code) return;
    const description = prompt("Описание (description):") || "";
    let hex           = prompt("HEX‑цвет (#rrggbb):");
    if (!hex) return;
    hex = hex.trim();
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
      alert("Неверный формат HEX‑цвета.");
      return;
    }
    threadsArray.push({ brand, code, description, hex });
    renderThreads();
  });

  // === 4. Canvas & кисточка ===
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;
  }
  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  // Уменьшение/увеличение толщины
  minusBtn.addEventListener("click", () => {
    brushSize = Math.max(1, brushSize - 1);
    sizeDisplay.textContent = brushSize;
  });
  plusBtn.addEventListener("click", () => {
    brushSize++;
    sizeDisplay.textContent = brushSize;
  });

  // Вкл/выкл кисточки
  brushBtn.addEventListener("click", () => {
    brushActive = !brushActive;
    brushBtn.textContent = brushActive ? "Кисточка: Вкл" : "Кисточка: Выкл";
  });

  // Очистка холста
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Рисование
  canvas.addEventListener("mousedown", (e) => {
    if (!brushActive) return;
    painting = true;
    ctx.beginPath();
    ctx.lineWidth   = brushSize;
    ctx.lineCap     = "round";
    ctx.strokeStyle = colorPicker.value;
    ctx.moveTo(e.offsetX, e.offsetY);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!painting) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });
  ["mouseup", "mouseleave"].forEach(evt =>
    canvas.addEventListener(evt, () => (painting = false))
  );

  // === 5. Старт ===
  renderThreads();
});
