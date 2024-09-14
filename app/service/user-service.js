const User = require("../models/user")

//create new user
exports.createUser = async (req ,res) => {
    validateRequest(req);
    const user = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
    };
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send({
        message: error.message || "Error when add a user!",
      });
  }
};

function validateRequest(req) {
  if (!req.body) {
    res.status(400).send({
      message: "Request is empty!",
    });
    return;
  }
}