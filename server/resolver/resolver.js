const { books, authors } = require('../data/static')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  // QUERY
  Query: {
    books: async (_, __, { mongoDataMethods: { getAllBooks } }) => {
      const books = await getAllBooks()
      return books
    },
    book: async (_, { id }, { mongoDataMethods: { getBookById } }) => {
      const book = await getBookById(id)
      return book
    },
    authors: async (_, __, { mongoDataMethods: { getAllAuthors } }) => {
      const authors = await getAllAuthors()
      return authors
    },
    author: async (_, { id }, { mongoDataMethods: { getAuthorById } }) => {
      const author = await getAuthorById(id)
      return author
    },
  },
  Book: {
    author: async (
      { authorId },
      _,
      { mongoDataMethods: { getAuthorById } }
    ) => {
      const author = await getAuthorById(authorId)
      return author
    },
  },
  Author: {
    books: async ({ id }, _, { mongoDataMethods: { getAllBooks } }) => {
      const books = await getAllBooks({ authorId: id })
      return books
    },
  },
  // MUTATION
  Mutation: {
    createAuthor: async (_, args, { mongoDataMethods: { createAuthor } }) => {
      const newAuthor = await createAuthor(args)
      return newAuthor
    },
    createBook: async (parent, args, { mongoDataMethods: { createBook } }) => {
      const newBook = await createBook(args)
      return newBook
    },
  },
}

module.exports = resolvers
