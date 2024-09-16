const book = require("../service/book-service")
const jwt = require("../middleware/jwt.auth")
module.exports = function(app) {

    app.post("/create",jwt.verifyToken,book.create)
    
}