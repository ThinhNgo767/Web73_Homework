const express = require("express");
const { ObjectId } = require("mongodb");

const checkUserRole = require("../middleware/checkUserRole.js");
const { db } = require("../utils/connectToDB");

const usersRouter = express.Router();

usersRouter.use(checkUserRole("admin"))
// get all
usersRouter.get("/", async (req, res) => {
  try {
    let query = {};
    const { from, to } = req.query;
    if (from && to) {
      query.age = { $gte: from, $lte: to };
    }

    const users = await db.users.find(query).toArray();

    if (users.length === 0) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      message: "Get successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// get with id
usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.users.findOne({
      _id: new ObjectId(id),
    });
    if (!user) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json({
      message: "Get successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Resource is not existence!",
      error: err.message,
    });
  }
});

// create new
usersRouter.post("/", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No data provided!",
    });
  }

  const newUser = {
    ...req.body,
  };

  try {
    const user = await db.users.insertOne(newUser);

    if (!user) {
      return res.status(404).json({
        message: "Insert failed!",
      });
    }
    const insertUser = { _id: user.insertedId, ...req.body };

    res.status(200).json({
      message: "Create new successfully",
      data: insertUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create failure!",
      error: err.message,
    });
  }
});

//update
usersRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { fullname, role, gender, age } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Missing ID",
    });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No data provided!",
    });
  }
  try {
    const user = await db.users.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          fullname: fullname,
          role: role,
          gender: gender,
          age: age,
        },
      }
    );
    if (user.modifiedCount === 0) {
      return res.status(404).json({
        message: "Data does not change",
      });
    }
    res.status(200).json({
      message: "Update successfully",
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failure!",
      error: err.message,
    });
  }
});

// delete
usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.user.deleteOne({
      _id: new ObjectId(id),
    });

    if (user.deletedCount === 0) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      message: "Delete successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failure!",
      error: err.message,
    });
  }
});

module.exports = usersRouter;
