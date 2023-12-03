const express = require("express");
const { ObjectId } = require("mongodb");

const checkUserRole = require("../middleware/checkUserRole");
const { db } = require("../utils/connectToDB");

const teachersRouter = express.Router();

teachersRouter.use(checkUserRole("teacher"));

// get all teachers
teachersRouter.get("/", async (req, res) => {
  try {
    let query = {};
    const { from, to } = req.query;
    if (from && to) {
      query.age = { $gte: from, $lte: to };
    }

    const teachers = await db.teachers.find(query).toArray();

    if (teachers.length === 0) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      message: "Get successfully",
      data: teachers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// get teacher by id
teachersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await db.teachers.findOne({
      _id: new ObjectId(id),
    });
    if (!teacher) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json({
      message: "Get successfully",
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({
      message: "Resource is not existence!",
      error: err.message,
    });
  }
});

// create new teacher
teachersRouter.post("/", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No data provided!",
    });
  }

  const newTeacher = {
    ...req.body,
  };

  try {
    const teacher = await db.teachers.insertOne(newTeacher);

    if (!teacher) {
      return res.status(404).json({
        message: "Insert failed!",
      });
    }
    const insertTeacher = { _id: teacher.insertedId, ...req.body };

    res.status(200).json({
      message: "Create new successfully",
      data: insertTeacher,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create failure!",
      error: err.message,
    });
  }
});

//update teacher
teachersRouter.put("/:id", async (req, res) => {
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
    const teacher = await db.teachers.updateOne(
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
    if (teacher.modifiedCount === 0) {
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

// delete teacher
teachersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await db.teachers.deleteOne({
      _id: new ObjectId(id),
    });

    if (teacher.deletedCount === 0) {
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

module.exports = teachersRouter;
