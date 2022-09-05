const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { default: mongoose } = require('mongoose')
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_DB = process.env.MONGO_DB || ''

app.use(cors())
app.use(express.json())

const schema = require('./graphql/schema')
const auth = require('./services/auth')

start = async () => {
  mongoose.connect(MONGO_DB, (error) => {
    if (error) {
      throw new Error(error)
    } else {
      console.log('Mongo db connected');
    }
  })

  const server = new ApolloServer({
    schema, 
    csrfPrevention: true,
    playground: true, 
    context: ({ req }) => {
      const token = req.headers.authorization || ''
      const user = auth.jwtVerify(token);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({app, cors: true})
  app.listen(PORT, () => {
    console.log('Server start at ' + PORT);
  })
}

start()