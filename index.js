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

// const serverURL = "https://nicholas-graham.com:25569/ask-question";
const serverURL = "http://localhost:3000/ask-question";

async function changeText() {
  try {
    var filePath = "info.txt"; // Update with the path to your .txt file
    var text = await fetchTextFile(filePath);
    var question = text + document.getElementById("user-input").value;
    var paragraph = document.getElementById("answer");
    paragraph.innerHTML = "Loading..."; // Notify the user that the request is being processed

    const response = await fetch(serverURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, model: "gpt-3.5-turbo" }), // Include the model parameter
    });

    if (!response.ok) {
      console.log(response);
      console.log(response);
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result); // Log the result object to the console
    const answer = result.choices[0].message.content;

    paragraph.innerHTML = answer; // Display the extracted text
  } catch (error) {
    console.error("Error:", error);
    paragraph.innerHTML = "An error occurred. Please try again later."; // Display an error message
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
