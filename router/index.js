const express = require("express")

const teachersRouter = require("./teachers.js")
const studentsRouter = require("./studens.js")
const usersRouter = require("./users.js")
const authRouter = require("./auth.js")
const requireAPIKey = require("../middleware/requireAPIKey.js")

const routers = express.Router()

routers.use(requireAPIKey)

routers.use("/login",authRouter)
routers.use("/teachers",teachersRouter)
routers.use("/students",studentsRouter)
routers.use("/users",usersRouter)


module.exports = routers