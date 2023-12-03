const express = require("express");
const { ObjectId } = require("mongodb");

const checkUserRole = require("../middleware/checkUserRole");
const { db } = require("../utils/connectToDB");

const studentsRouter = express.Router();

studentsRouter.use(checkUserRole("student"))
// get all teachers
studentsRouter.get("/", async (req, res) => {
  try {
    let query = {};
    const { from, to } = req.query;
    if (from && to) {
      query.age = { $gte: from, $lte: to };
    }

    const students = await db.students.find(query).toArray();

    if (students.length === 0) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      message: "Get successfully",
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
});

// get teacher by id
studentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await db.students.findOne({
      _id: new ObjectId(id),
    });
    if (!student) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
    res.status(200).json({
      message: "Get successfully",
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      message: "Resource is not existence!",
      error: err.message,
    });
  }
});

// create new teacher
studentsRouter.post("/", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "No data provided!",
    });
  }

  const newStudent = {
    ...req.body,
  };

  try {
    const student = await db.students.insertOne(newStudent);

    if (!student) {
      return res.status(404).json({
        message: "Insert failed!",
      });
    }
    const insertStudent = { _id: student.insertedId, ...req.body };

    res.status(200).json({
      message: "Create new successfully",
      data: insertStudent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create failure!",
      error: err.message,
    });
  }
});

//update teacher
studentsRouter.put("/:id", async (req, res) => {
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
    const student = await db.students.updateOne(
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
    if (student.modifiedCount === 0) {
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
studentsRouter.delete("/:id", async(req, res) => {
  const id = req.params.id;
  try {
    const student = await db.students.deleteOne({
      _id: new ObjectId(id),
    });

    if (student.deletedCount === 0) {
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

module.exports = studentsRouter;
