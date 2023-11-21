const express = require("express");

const { teachers } = require("../mock/teachers");

const teachersRouter = express.Router();

// get all teachers
teachersRouter.get("/teachers", (req, res) => {
  const {from, to } = req.query;
  if (from && to) {
    const teacherQuery = teachers.filter((t) => t.age >= from && t.age <= to);
    return res.json({ data: teacherQuery });
  } else {
    res.json({ data: teachers });
  }
});

// get teacher by id
teachersRouter.get("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;

  const teacher = teachers.find((t) => t.id === teacherId);

  if (!teacher) {
    res.json({
      message: "Resource is not existence!",
    });
  }
  return res.json({ data: teacher });
});

// create new teacher
teachersRouter.post("/teachers", (req, res) => {
  const newTeacher = req.body;

  teachers.push(newTeacher);

  return res.json({
    message: "Create new successfully",
  });
});

//update teacher
teachersRouter.put("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  const newDataTeacher = req.body;

  const teacherIndex = teachers.findIndex((t) => t.id === teacherId);

  if (teacherIndex === -1) {
    return res.json({
      message: "Resource is not exist",
    });
  }

  const updatedTeacher = {
    ...teachers[teacherIndex],
    ...newDataTeacher,
  };

  teachers[teacherIndex] = updatedTeacher;

  return res.json({
    message: "Update successfully",
  });
});

// delete teacher
teachersRouter.delete("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  const teacherIndex = teachers.findIndex((t) => t.id === teacherId);

  if (teacherIndex === -1) {
    return res.json({
      message: "Resource is not exist",
    });
  }

  teachers.splice(teacherIndex, 1);

  return res.json({
    message: "Delete successfully",
  });
});

module.exports = { teachersRouter };