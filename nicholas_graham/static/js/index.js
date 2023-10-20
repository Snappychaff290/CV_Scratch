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
async function fetchTextFile(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  return text;
}

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

function submitForm() {
  document.getElementById("answer").innerText = "Loading...";
  var userInput = document.getElementById("user-input").value;
  console.log(window.location.href);
  fetch(window.location.href + "get_response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_input: userInput }),
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("answer").innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
