// Получаем контейнеры
const listEl = document.getElementById("thread-list");
const selectionEl = document.getElementById("selection");

// Массив для выбранных нитей
let selected = [];

// Рендерим все нитки
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

// Рендерим выбор пользователя
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

// Инициализация
renderThreads();
renderSelection();
