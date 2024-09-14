const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  auther: { type: String, required: true },
  page: { type: Number, required: true },
  date: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);
