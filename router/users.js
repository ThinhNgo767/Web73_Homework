const express = require("express");
const jwt = require("jsonwebtoken");

const USERS = require("../mock/users.js");
const {
  authenRegister,
  authorizationAdmin,
} = require("../middleware/accessControl.js");

const authenticateLogin = require("../utils/authenticateLogin.js");

const usersRouter = express.Router();

// get all
usersRouter.get("/", authorizationAdmin, (req, res) => {
  const { from, to, gender } = req.query;
  if (from && to) {
    const usersFromTo = USERS.filter(
      (user) => user.age >= from && user.age <= to
    );
    return res.json({ data: usersFromTo });
  } else if (gender) {
    const usersGender = USERS.filter((user) => user.gender === gender);
    return res.json({ data: usersGender });
  } else {
    res.json({ data: USERS });
  }
});

// get with id
usersRouter.get("/:id", authorizationAdmin, (req, res) => {
  const user = USERS.find((user) => user.id === +req.params.id);

  if (!user) {
    res.json({
      message: "Resource is not existence!",
    });
  }
  return res.json({ data: user });
});

// create new
usersRouter.post("/", authenRegister, (req, res) => {
  const newUser = {
    ...req.body,
    id: USERS.length + 1,
  };

  USERS.push(newUser);
  res.json({
    message: "Create new successfully",
    data: newUser,
  });
});

// login
// usersRouter.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.json({
//       message: "Missing input data!",
//     });
//   }
//   try {
//     const existingUser = await authenticateLogin(USERS, req.body);

//     const { id, username, isAdmin, gender, age } = existingUser;

//     const payload = {
//       id: id,
//       username: username,
//       isAdmin: isAdmin,
//       gender: gender,
//       age: age,
//     };
//     const SECRET_KEY = process.env.SECRET_KEY;
//     const token = jwt.sign(payload, SECRET_KEY, {
//       expiresIn: "60s",
//     });
//     res.json({
//       message: "Login successfully",
//       accessToken: token,
//     });

//     res.json(existingUser);
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// });

//update
usersRouter.put("/:id", (req, res) => {
  const userIndex = USERS.findIndex((teacher) => teacher.id === +req.params.id);

  if (userIndex === -1) {
    return res.json({
      message: "Resource is not existence",
    });
  }

  const updatedUser = {
    ...USERS[userIndex],
    ...req.body,
  };

  USERS[userIndex] = updatedUser;

  return res.json({
    message: "Update successfully",
    data: updatedUser,
  });
});

// delete
usersRouter.delete("/:id", authorizationAdmin, (req, res) => {
  const userIndex = USERS.findIndex((teacher) => teacher.id === +req.params.id);

  if (userIndex === -1)
    return res.json({
      message: "Resource is not exist",
    });

  USERS.splice(userIndex, 1);

  res.json({
    message: "Delete successfully",
  });
});

module.exports = usersRouter;
