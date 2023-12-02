const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateLogin = require("../utils/authenticateLogin");
const TEACHERS = require("../mock/teachers");
const USERS = require("../mock/users");

const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      message: "Missing input data!",
    });
  }

  try {
    const existingUser = await authenticateLogin(req.body, ...TEACHERS, ...USERS);

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
      expiresIn : "300s"
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
