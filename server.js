const express = require("express");
const path = require("path");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/tutor", async (req, res) => {
  try {
    const question = String(req.body.question || "").trim();
    if (!question) return res.status(400).json({ error: "Please enter a question." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "AI Tutor is not configured. Add OPENAI_API_KEY to the server environment." });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions:
        "You are SE Learn's friendly Software Engineering tutor. " +
        "Teach a beginner clearly and safely. Use short explanations, simple examples, " +
        "and a small practice question when useful. Help the student understand rather than " +
        "simply completing graded assessments for them.",
      input: question
    });

    res.json({ answer: response.output_text });
  } catch (error) {
    console.error("Tutor error:", error);
    res.status(500).json({ error: "The tutor could not respond right now." });
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.listen(PORT, () => console.log(`SE Learn listening on port ${PORT}`));
