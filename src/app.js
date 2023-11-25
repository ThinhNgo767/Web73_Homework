const { createFile, readFile } = require("../modules/fileSystem.js");
const logRequestTime = require("../middleware/logRequestTime");
const routers = require("../router/index.js");

const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(logRequestTime);

// let fileName = "text.txt";
// let fileContent = "Hello MindX!";

// createFile(fileName, fileContent);

// readFile(fileName);

app.get("/", (req, res) => {
  res.send(`<h1>Hello, this is homepage</h1>`);
});

app.use("/api/v1", routers);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
