const book = require("../service/book-service")
const jwt = require("../middleware/jwt.auth")
module.exports = function(app) {

    app.post("/create", jwt.verifyToken, book.create)
    app.get("/allbook", jwt.verifyToken, book.findAll)
    app.get("/getbook",jwt.verifyToken,book.findOne)
    app.put("/updatebook", jwt.verifyToken, book.update);
    app.delete("/deletebook", jwt.verifyToken, book.delete);

    
}