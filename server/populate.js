require('dotenv').config()
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const { books, authors } = require('./data/static')
const { to } = require('./utils/async')

const start = async () => {
	const [err] = await to(mongoose.connect(process.env.MONGO_URI))

	if (!err) {
		await to(Book.deleteMany())
		await to(Book.create(books))
		console.log('done')
	} else {
		console.log(error)
	}
	process.exit(0)
}

start()
