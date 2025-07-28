// Получаем контейнеры
const listEl = document.getElementById("thread-list");
const selectionEl = document.getElementById("selection");

// Массив для выбранных нитей
let selected = [];

// Функция рендера списка всех нитей
function renderThreads() {
  listEl.innerHTML = ""; // очистить перед отрисовкой
  threads.forEach((thread, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // цветной прямоугольник
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = thread.hex;
    card.appendChild(colorBox);

    // текст с брендом и кодом
    const info = document.createElement("div");
    info.innerHTML = `<strong>${thread.brand}</strong><br>Код: ${thread.code}`;
    card.appendChild(info);

    // клик по карточке — добавляем/удаляем из selection
    card.onclick = () => {
      const idx = selected.indexOf(index);
      if (idx === -1) {
        selected.push(index);
      } else {
        selected.splice(idx, 1);
      }
      renderSelection();
    };

    listEl.appendChild(card);
  });
}

// Функция рендера выбранных нитей ("сборка")
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
