const fetch = require("cross-fetch");
const express = require("express");
const cors = require("cors");

// Rest of your code remains the same

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post("/ask-question", async (req, res) => {
  const { question } = req.body; // Extract the question parameter from the request body
  const apiKey = "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"; // Replace with your actual API key
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
    temperature: 1.0,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
