require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// Load schemas and resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
const { to } = require('./utils/async')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const connectDB = async () => {
  const [err] = await to(mongoose.connect(process.env.MONGO_URI))
  if (err) {
    console.log(err.message)
    process.exit()
    return
  }
  console.log('MongoDB connected')
}
connectDB()

const app = express()

let server = null
const startServer = async (app) => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  })
  await server.start()
  server.applyMiddleware({ app })
}
startServer(app)

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
