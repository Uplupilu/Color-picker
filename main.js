// main.js

// Данные нитей из colors.js
// const threads = [ ... ];

// Контейнеры
const listEl       = document.getElementById("thread-list");
const selectionEl  = document.getElementById("selection");
const addThreadBtn = document.getElementById("add-thread-btn");

// Массив для выбранных нитей
let selected = [];

// Функция рендера списка нитей
function renderThreads() {
  listEl.innerHTML = "";
  threads.forEach((thread, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = thread.hex;
    card.appendChild(colorBox);

    const info = document.createElement("div");
    info.innerHTML = `<strong>${thread.brand}</strong><br>Код: ${thread.code}`;
    card.appendChild(info);

    card.onclick = () => {
      const idx = selected.indexOf(index);
      if (idx === -1) selected.push(index);
      else selected.splice(idx, 1);
      renderSelection();
    };

    listEl.appendChild(card);
  });
}

// Функция рендера выбранных нитей
function renderSelection() {
  selectionEl.innerHTML = "";
  selected.forEach(i => {
    const thread = threads[i];
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = thread.hex;
    box.title = `${thread.brand} ${thread.code}`;
    selectionEl.appendChild(box);
  });
}

// Обработка клика по "Добавить нить"
addThreadBtn.addEventListener("click", () => {
  const brand = prompt("Введите название фирмы (brand):");
  if (!brand) return;
  const code = prompt("Введите код нити:");
  if (!code) return;
  const description = prompt("Введите описание (description):");
  if (description === null) return;
  const hex = prompt("Введите HEX‑цвет (например #ff0000):");
  if (!hex || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim())) {
    alert("Неверный формат HEX‑цвета.");
    return;
  }
  threads.push({ brand, code, description, hex: hex.trim() });
  renderThreads();
});

// Инициализация
renderThreads();
renderSelection();
