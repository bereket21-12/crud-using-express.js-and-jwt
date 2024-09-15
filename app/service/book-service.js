const Book = require("../models/book")


//create new book
exports.create = async (req, res) => {
validateRequest(req)
    const book = {
        name: req.body.name,
        auther: req.body.auther,
        date: req.body.date,
        page:req.body.page
    }

try {
    newBook = await Book.create(book)
    return newBook;

} catch (error) {
    console.log("Unable to create new book", error)
          res.status(500).send({
            message: error.message || "Error when add a book!",
          });
    throw error;

}
    
}
function validateRequest(req) {
  if (!req.body) {
    res.status(400).send({
      message: "Request is empty!",
    });
    return;
  }
}

