const express = require("express");
const { ObjectId } = require("mongodb");

const STUDENTS = require("../mock/students");
const logRequestMethod = require("../middleware/logRequestMethod");
const checkUserRole = require("../middleware/checkUserRole");
const { db } = require("../utils/connectToDB");

const studentsRouter = express.Router();

studentsRouter.use("/:id", logRequestMethod);

studentsRouter.use(checkUserRole("student"))
// get all teachers

studentsRouter.get("/", (req, res) => {
  const { from, to } = req.query;
  if (from && to) {
    const studentQuery = STUDENTS.filter(
      (student) => student.age >= from && student.age <= to
    );
    return res.json({ data: studentQuery });
  } else {
    res.json({ data: STUDENTS });
  }
});

// get teacher by id
studentsRouter.get("/:id", (req, res) => {
  const student = STUDENTS.find((student) => student.id === +req.params.id);

  if (!student) {
    res.json({
      message: "Resource is not existence!",
    });
  }
  return res.json({ data: student });
});

// create new teacher
studentsRouter.post("/", async (req, res) => {
  const newStudent = {
    ...req.body
  };

  await db.teachers.insertOne(newStudent);

  res.json({
    message: "Create new successfully",
    data: newStudent,
  });
});

//update teacher
studentsRouter.put("/:id", (req, res) => {
  const studentIndex = STUDENTS.findIndex(
    (student) => student.id === +req.params.id
  );

  if (studentIndex === -1) {
    return res.json({
      message: "Resource is not existence",
    });
  }

  const updatedStudent = {
    ...STUDENTS[studentIndex],
    ...req.body,
  };

  STUDENTS[studentIndex] = updatedStudent;

  return res.json({
    message: "Update successfully",
    data: updatedStudent,
  });
});

// delete teacher
studentsRouter.delete("/:id", (req, res) => {
    const studentIndex = STUDENTS.findIndex(
        (student) => student.id === +req.params.id
      );

  if (studentIndex === -1)
    return res.json({
      message: "Resource is not exist",
    });

  STUDENTS.splice(studentIndex, 1);

  res.json({
    message: "Delete successfully",
  });
});

module.exports = studentsRouter;
