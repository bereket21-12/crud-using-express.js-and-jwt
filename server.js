const express = require("express")
const core = require("cores")
const db = require("./app/models")

const app = express()

app.listen(8000, () => {
    console.log("The app is listing on port number 8000")
})