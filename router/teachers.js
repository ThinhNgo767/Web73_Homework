const express = require("express");
const { ObjectId } = require("mongodb");

const TEACHERS = require("../mock/teachers");
const logRequestMethod = require("../middleware/logRequestMethod");
const checkUserRole = require("../middleware/checkUserRole");
const { db } = require("../utils/connectToDB");

const teachersRouter = express.Router();

teachersRouter.use("/:id", logRequestMethod);

// get all teachers
// teachersRouter.use(checkUserRole("teacher"))

teachersRouter.get("/", (req, res) => {
  const { from, to } = req.query;
  if (from && to) {
    const teacherQuery = TEACHERS.filter(
      (teacher) => teacher.age >= from && teacher.age <= to
    );
    return res.json({ data: teacherQuery });
  } else {
    res.json({ data: TEACHERS });
  }
});

// get teacher by id
teachersRouter.get("/:id", (req, res) => {
  const teacher = TEACHERS.find((teacher) => teacher.id === +req.params.id);

  if (!teacher) {
    res.json({
      message: "Resource is not existence!",
    });
  }
  return res.json({ data: teacher });
});

// create new teacher
teachersRouter.post("/", async (req, res) => {
  const newTeacher = {
    ...req.body
  };

  await db.teachers.insertOne(newTeacher);

  res.json({
    message: "Create new successfully",
    data: newTeacher,
  });
});

//update teacher
teachersRouter.put("/:id", (req, res) => {
  const teacherIndex = TEACHERS.findIndex(
    (teacher) => teacher.id === +req.params.id
  );

  if (teacherIndex === -1) {
    return res.json({
      message: "Resource is not existence",
    });
  }

  const updatedTeacher = {
    ...TEACHERS[teacherIndex],
    ...req.body,
  };

  TEACHERS[teacherIndex] = updatedTeacher;

  return res.json({
    message: "Update successfully",
    data: updatedTeacher,
  });
});

// delete teacher
teachersRouter.delete("/:id", (req, res) => {
  const teacherIndex = TEACHERS.findIndex(
    (teacher) => teacher.id === +req.params.id
  );

  if (teacherIndex === -1)
    return res.json({
      message: "Resource is not exist",
    });

  TEACHERS.splice(teacherIndex, 1);

  res.json({
    message: "Delete successfully",
  });
});

module.exports = teachersRouter;
