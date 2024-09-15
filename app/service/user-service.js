const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("../config/jwt-config")


//create new user
exports.signup = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Request is empty!",
    });
  }

  const user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    // Create new User and save it to the database
    const newUser = new User(user);
    await newUser.save();

    // Send a success response
    res.status(201).send({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({
      message: error.message || "Error when adding a user!",
    });
  }
};
//login
exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Request is empty!",
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      // Compare passwords
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }

      // Create a token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 600, // Token expires in 10 minutes (600 seconds)
      });

      // Send user data with token
      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

