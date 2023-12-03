const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateLogin = require("../utils/authenticateLogin");
const getDataFromMongoDB = require("../utils/getDataFromMongoDB")
const {db} = require("../utils/connectToDB")

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      message: "Missing input data!",
    });
  }
const teachers = await getDataFromMongoDB(db.teachers)
const students = await getDataFromMongoDB(db.students)
const users = await getDataFromMongoDB(db.users)

  try {
    const existingUser = await authenticateLogin(req.body, ...teachers,...students, ...users);

    const { id, fullname, username, role, gender, age } = existingUser;
    
    const SECRET_KEY = process.env.SECRET_KEY

    const payload = {
      id: id,
      fullname: fullname,
      username: username,
      role: role,
      gender: gender,
      age: age,
    };

    const token = jwt.sign(payload,SECRET_KEY,{
      expiresIn : "3000s"
    })

    res.json({
      message: "Login successfully",
      accessToken : token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = authRouter;
