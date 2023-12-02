require("dotenv").config();
const express = require("express");

const logRequestTime = require("../middleware/logRequestTime");
const routers = require("../router/index.js");
const authRouter = require("../router/auth.js");
const { connectToDB } = require("../utils/connectToDB.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(logRequestTime);

app.get("/", (req, res) => {
  res.send(`<h1>Sever running...</h1>`);
});

app.use("/api/v1", routers)

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
  connectToDB();
});
