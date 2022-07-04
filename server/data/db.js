const Author = require('../models/Author')
const Book = require('../models/Book')

const mongoDataMethods = {
  getAllBooks: (condition) => {
    if (!condition) {
      return Book.find()
    }
    return Book.find(condition)
  },
  getBookById: (id) => Book.findById(id),
  getAllAuthors: () => Author.find(),
  getAuthorById: (id) => Author.findById(id),
  createAuthor: (args) => {
    const newAuthor = new Author(args)
    return newAuthor.save()
  },
  createBook: (args) => {
    const newBook = new Book(args)
    return newBook.save()
  },
}

module.exports = mongoDataMethods
