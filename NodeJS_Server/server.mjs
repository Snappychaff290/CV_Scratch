import express from "express";
import cors from "cors";
import fetch from "node-fetch";

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
