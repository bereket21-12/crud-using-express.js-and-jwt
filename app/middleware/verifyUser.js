const User = require("../models/user")

exports.checkExistingEmail = (req, res, next) => {
    
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
      res.status(400).send({
        message: "email already used!"
      });
      return;
    }
    next();
  })
}