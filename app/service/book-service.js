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
 const newBook = new Book(book)
  await newBook.save()
    
   res.status(201).send({
    message: "book created",
    book:newBook
  })

} catch (error) {
    console.log("Unable to create new book", error)
          res.status(500).send({
            message: error.message || "Error when add a book!",
          });
    throw error;

}
    
}
//get all books
exports.findAll = async (req, res) => {
  
  try {
    const allBook = await Book.find();
    res.send(allBook)
  } catch (error) {
    res.status(500).send({message:"Unable to get books"})
  }
  
}

//get book by id
exports.findOne = async (req, res) => {
  validateRequest(req)
  const id = req.query.id
  try {
    const selectedBook = await Book.findById(id);
    res.send(selectedBook)
  } catch (error) {
    res.status(500).send({message:"Unable to get selected book"})
  }
  
}

//update book by id
exports.update = async (req, res) => {
  validateRequest(req)
  const id = req.query.id
  const updatedBook = {
    name: req.body.name,
    page: req.body.page,
    auther: req.body.page,
    date:req.body.date
  }
  try {
const updated = await Book.findByIdAndUpdate(id, updatedBook, {
  new: true, 
  runValidators: true, 
});

if (!updated) {
  return res.status(404).send("Book not found");
}

res.send(updated);
  } catch (error) {
    res.status(500).send({message:"Unable to update the book"})
  }
  
}

exports.delete = async (req, res) => {
  const id = req.query.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(id); // Use findByIdAndDelete

    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" }); // Send 404 if not found
    }

    res.status(200).send({ message: "Deleted successfully" }); // Send success response
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting the book", error: error.message }); // Send error response with 500
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

