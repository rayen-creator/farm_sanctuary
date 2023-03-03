const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const morgan = require("morgan");
require("dotenv").config();
const typeDefs = require("./src/schema/schema.graphql");

//mongodbconnection
const mongodbconnection = require("./src/db/index");
//all resolvers
const authResolver = require("./src/resolvers/auth.resolver");
const userResolver=require("./src/resolvers/user.resolver");
//log for http requests
app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: [
    userResolver,
    authResolver
  ],
  debug: true, // enable debug mode
});
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
