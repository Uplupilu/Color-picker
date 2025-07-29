// app.js

document.addEventListener("DOMContentLoaded", () => {
  const threadsArray = threads;   // из colors.js
  const listEl       = document.getElementById("thread-list");
  const addBtn       = document.getElementById("add-thread-btn");
  const delBtn       = document.getElementById("delete-thread-btn");
  const colorPicker  = document.getElementById("brush-color");
  const brushBtn     = document.getElementById("brush-btn");
  const clearBtn     = document.getElementById("clear-btn");
  const minusBtn     = document.getElementById("thickness-minus");
  const plusBtn      = document.getElementById("thickness-plus");
  const sizeDisp     = document.getElementById("brush-size-value");
  const canvas       = document.getElementById("rod-canvas");
  const ctx          = canvas.getContext("2d");

  let selectedIndex = null;
  let painting      = false;
  let brushSize     = parseInt(sizeDisp.textContent) || 10;
  let brushActive   = true;

  // Стартовое состояние
  brushBtn.textContent = "Кисточка: Вкл";
  sizeDisp.textContent = brushSize;
  updateDeleteBtn();

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
    threadsArray.forEach((t, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      if (idx === selectedIndex) card.classList.add("selected");

      const box = document.createElement("div");
      box.className = "color-box";
      box.style.backgroundColor = t.hex;
      card.appendChild(box);

      const info = document.createElement("div");
      info.innerHTML = `<strong>${t.brand}</strong><br>Код: ${t.code}`;
      card.appendChild(info);

      card.addEventListener("click", () => {
        selectedIndex = idx;
        colorPicker.value = t.hex;
        renderThreads();
        updateDeleteBtn();
      });

      listEl.appendChild(card);
    });
  }

  // Добавить нить
  addBtn.addEventListener("click", () => {
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
    updateDeleteBtn();
  });

  // Удалить нить
  delBtn.addEventListener("click", () => {
    if (selectedIndex === null) return;
    threadsArray.splice(selectedIndex, 1);
    selectedIndex = null;
    renderThreads();
    updateDeleteBtn();
  });

  // Уменьшить/увеличить толщину кисти
  minusBtn.addEventListener("click", () => {
    brushSize = Math.max(1, brushSize - 1);
    sizeDisp.textContent = brushSize;
  });
  plusBtn.addEventListener("click", () => {
    brushSize++;
    sizeDisp.textContent = brushSize;
  });

  // Вкл/выкл кисточки
  brushBtn.addEventListener("click", () => {
    brushActive = !brushActive;
    brushBtn.textContent = brushActive ? "Кисточка: Вкл" : "Кисточка: Выкл";
  });

  // Очистить канвас
  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Начало рисования
  canvas.addEventListener("mousedown", e => {
    if (!brushActive) return;
    painting = true;
    ctx.beginPath();
    ctx.lineWidth   = brushSize;
    ctx.lineCap     = "round";
    ctx.strokeStyle = colorPicker.value;
    ctx.moveTo(e.offsetX, e.offsetY);
  });
  // Рисуем по движению мыши
  canvas.addEventListener("mousemove", e => {
    if (!painting) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });
  // Завершение штриха
  ["mouseup","mouseleave"].forEach(evt =>
    canvas.addEventListener(evt, () => painting = false)
  );

  // Первый рендер
  renderThreads();
});
