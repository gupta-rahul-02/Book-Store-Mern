const Book = require("../models/Book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).json({
      books,
    });
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available ,imageUrl} = req.body;
  try {
    const book = new Book({
      name,
      author,
      description,
      price,
      available,
      imageUrl
    });
    await book.save();
    if (!book) {
      return res.status(500).json({ message: "Unable to add book" });
    }
    return res.status(200).json({ message: "Book added successfully",
book });
   
  } catch (error) {
    console.log(error);
  }
  
};

const getBookById = async (req, res, next) => {
    const id = req.params.id
    try {
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ message: "Book not found"})
        }
        return res.status(200).json({book});
    } catch (error) {
        console.log(error);
    }
}

const updateBook = async (req,res,next) =>{
    const id = req.params.id
    try {
        
        const {name,author,description,price,available,imageUrl} = req.body
        let book = await Book.findByIdAndUpdate(id,{
            name,author,description,price,available,imageUrl
        })
        if(!book){
            return res.status(404).json({ message: "Book not found"})
        }
        book = await book.save()
        return res.status(200).json({message:"Book updated",book})
         
    } catch (error) {
        console.log(error)
    }
}

const deleteBook = async (req,res,next) =>{
    const id = req.params.id
    let book 
    try {
        book = await Book.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
    if(!book){
        return res.status(404).json({ message: "Unable to delete book"})
    }
    return res.status(200).json({message:"Book deleted",book})
}

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getBookById = getBookById
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;