const { createFile, readFile } = require("./modules/fileSystem");
const {teachersRouter } = require("../router/teachers")
const logRequestTime =require("../middleware/logRequestTime")

const express = require("express");

const app = express();
const PORT = 3001

app.use(express.json());
app.use(logRequestTime)

// let fileName = "text.txt";
// let fileContent = "Hello MindX!";

// createFile(fileName, fileContent);

// readFile(fileName);

app.get("/", (req, res) => {
  res.send(`<h1>Hello, this is homepage</h1>`);
});


app.use("/api/v1",teachersRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
