const express = require("express")
const cores = require("cors")
const db = require("./app/models")

const app = express()

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cores({
    origin: "*", // Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"], // Allow Authorization header
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "This is a simple CRUD project using node js and mongodb",
  });
});

require("./app/routes/user-route")(app)
require("./app/routes/book-route")(app)
app.listen(3000, () => {
    console.log("The app is listing on port number 8000")
})