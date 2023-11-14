const {createFile ,readFile} = require("./modules/fileSystem")

const express = require('express')
const app = express()

let fileName = "text.txt"
let fileContent = "Hello MindX!"

createFile(fileName,fileContent)

readFile(fileName)

app.get('/', (req, res) => {
    res.send(`<h1>Hello, this is homepage</h1>`)
  })
  
  app.listen(3001, () => {
    console.log("Example app listening on port 3001")
  })

