const express = require("express")

const teachersRouter = require("./teachers.js")
const usersRouter = require("./users.js")
const requireAPIKey = require("../middleware/requireAPIKey.js")

const routers = express.Router()

routers.use(requireAPIKey)

routers.use("/teachers",teachersRouter)
routers.use("/users",usersRouter)

module.exports = routers