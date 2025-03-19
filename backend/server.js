const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Correct path to `quizData.json` inside the `data` folder
const filePath = path.join(__dirname, "data", "quizData.json");

// Check if file exists before reading it
if (!fs.existsSync(filePath)) {
    console.error("❌ Error: quizData.json file not found in the 'data' folder!");
    process.exit(1);
}

const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));

app.get("/api/questions", (req, res) => {
    res.json(questions);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
