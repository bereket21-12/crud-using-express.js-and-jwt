const User = require("../models/user")

exports.checkExistingEmail = (req, res, next) => {
    
  User.findOne({
    where: {
      username: req.body.email
    }
  }).then(user => {
      if (user) {
      res.status(400).send({
        message: "Username already used!"
      });
      return;
    }
    next();
  })
}