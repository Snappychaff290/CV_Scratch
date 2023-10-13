document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

// CHATBOT
function toggleChat() {
  var chatPopup = document.getElementById("chat");
  var chatContainer = document.getElementById("chat-popup");

  if (chatPopup.style.display === "block") {
    chatPopup.style.display = "none";
    chatContainer.style.display = "block";
  } else {
    chatPopup.style.display = "block";
    chatContainer.style.display = "none"; // Adjust the height as needed
  }
}
// CHATBOT

// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const container = document.getElementById("glitch-container");
const glitchElement = document.getElementById("glitch-effect");

container.addEventListener("mouseover", () => {
  let iteration = 0;
  glitchElement.classList.add("red-glow");
  glitchElement.classList.remove("aquamarine-glow");

  clearInterval(interval);

  interval = setInterval(() => {
    glitchElement.innerHTML = glitchElement.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return `<span class="aquamarine-glow">${glitchElement.dataset.value[index]}</span>`;
        } else if (index == 8) {
          return " ";
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= glitchElement.dataset.value.length) {
      clearInterval(interval);
      glitchElement.classList.remove("red-glow");
    }

    iteration += 1 / 3;
  }, 30);
});
