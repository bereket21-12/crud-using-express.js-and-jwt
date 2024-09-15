const user = require ("../service/user-service")
const verify = require("../middleware/verifyUser")

module.exports = function (app) {
    
  app.use(function (req, res, next) {
res.header(
  "Access-Control-Allow-Headers",
  "Authorization, Origin, Content-Type, Accept"
);
    next();
  });
    
    app.post("/signup", verify.checkExistingEmail, user.signup);
    app.post("/signin",user.signin)
    
}