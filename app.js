// app.js
document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM-элементы (база нитей) =====
  const threadsArray = threads;   // из colors.js
  const listEl       = document.getElementById("thread-list");
  const addBtn       = document.getElementById("add-thread-btn");
  const delBtn       = document.getElementById("delete-thread-btn");

  // ===== DOM-элементы (рисовалка) =====
  const colorPicker  = document.getElementById("brush-color");
  const brushBtn     = document.getElementById("brush-btn");
  const clearBtn     = document.getElementById("clear-btn");
  const minusBtn     = document.getElementById("thickness-minus");
  const plusBtn      = document.getElementById("thickness-plus");
  const sizeDisp     = document.getElementById("brush-size-value");
  const canvas       = document.getElementById("rod-canvas");
  const ctx          = canvas.getContext("2d");

  // ===== DOM-элементы (моды: обмотки / рисовалка) — опционально =====
  const modeWrapBtn   = document.getElementById("mode-wrap")   || null;
  const modePaintBtn  = document.getElementById("mode-paint")  || null;
  const createWrapBtn = document.getElementById("create-wrap") || null;

  // ===== Состояние =====
  let selectedIndex = null;
  let painting      = false;
  let brushSize     = parseInt(sizeDisp?.textContent || "10", 10) || 10;
  let brushActive   = true;
  let currentMode   = modeWrapBtn && modePaintBtn ? "paint" : "paint"; // по умолчанию рисовалка

  // Стартовые подписи
  if (brushBtn) brushBtn.textContent = "Кисточка: Вкл";
  if (sizeDisp) sizeDisp.textContent = brushSize;

  // --- Утилиты ---
  function updateDeleteBtn() {
    if (delBtn) delBtn.disabled = (selectedIndex === null);
  }

  function setMode(mode) {
    currentMode = mode;
    // подсветка табов, если есть
    if (modeWrapBtn)  modeWrapBtn.classList.toggle("active", mode === "wrap");
    if (modePaintBtn) modePaintBtn.classList.toggle("active", mode === "paint");

    // доступность кнопки "Создать обмотку"
    if (createWrapBtn) createWrapBtn.disabled = (mode !== "wrap");

    // чтобы не рисовать в режиме обмоток
    brushActive = (mode === "paint");
    if (brushBtn) brushBtn.textContent = brushActive ? "Кисточка: Вкл" : "Кисточка: Выкл";
  }

  // ===== Рендер карточек нитей =====
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
        if (colorPicker) colorPicker.value = t.hex; // цвет кисточки под выбранную нить
        renderThreads();
        updateDeleteBtn();
        // если режим "обмотки", разблокируем кнопку создания (если есть)
        if (createWrapBtn && currentMode === "wrap") createWrapBtn.disabled = false;
      });

      listEl.appendChild(card);
    });
  }

  // ===== Добавить / Удалить нить =====
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const brand       = prompt("Название фирмы (brand):");
      if (!brand) return;
      const code        = prompt("Код нити:");
      if (!code) return;
      const description = prompt("Описание (description):") || "";
      let hex           = prompt("HEX-цвет (#rrggbb):");
      if (!hex) return;
      hex = hex.trim();
      if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
        alert("Неверный формат HEX-цвета.");
        return;
      }
      threadsArray.push({ brand, code, description, hex });
      ren
