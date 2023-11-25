const express = require("express");

const USERS = require("../mock/users.js");
const {
  authenRegister,
  authorizationAdmin,
} = require("../middleware/accessControl.js");

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
usersRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find((user) => user.username === username);

  if (!user) {
    res.json({ message: "Account not found" });
  } else if (user.password !== password) {
    return res.json({ message: "Wrong password" });
  } else {
    const response = {
      username: user.username,
      gender: user.gender,
      age: user.age,
      id: user.id,
    };

    res.json({
      message: "Login successfully",
      data: user.isAdmin
        ? { ...response, accessToken: "YOU_IS_ADMIN" }
        : response,
    });
  }
});

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