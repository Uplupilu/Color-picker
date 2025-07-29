// main.js

document.addEventListener("DOMContentLoaded", () => {
  // Элементы после загрузки DOM
  const listEl       = document.getElementById("thread-list");
  const addThreadBtn = document.getElementById("add-thread-btn");
  const colorPicker  = document.getElementById("brush-color");

  // selectedIndex теперь для одной нити
  let selectedIndex = null;

  // Рендерим все нитки из глобального массива `threads`
  function renderThreads() {
    listEl.innerHTML = "";
    threads.forEach((thread, idx) => {
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

      // По клику выбираем только эту нить
      card.onclick = () => {
        selectedIndex = idx;
        colorPicker.value = thread.hex;
        renderThreads();
      };

      listEl.appendChild(card);
    });
  }

  // Обработчик кнопки «Добавить нить»
  addThreadBtn.addEventListener("click", () => {
    const brand       = prompt("Название фирмы (brand):");
    if (!brand) return;
    const code        = prompt("Код нити:");
    if (!code) return;
    const description = prompt("Описание (description):") || "";
    const hex         = prompt("HEX‑цвет (#rrggbb):");
    if (!hex || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim())) {
      alert("Неверный формат HEX‑цвета.");
      return;
    }
    threads.push({ brand, code, description, hex: hex.trim() });
    renderThreads();
  });

  // Первый рендер
  renderThreads();
});
