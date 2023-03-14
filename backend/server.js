const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const morgan = require("morgan");
require("dotenv").config();
const typeDefs = require("./src/schema/schema.graphql");
const cors = require("cors");
//mongodbconnection
const mongodbconnection = require("./src/db/index");
//all resolvers
const authResolver = require("./src/resolvers/auth.resolver");
const userResolver = require("./src/resolvers/user.resolver");
const verifyToken = require("./src/middleware/authJwt");

const agentResolver = require("./src/resolvers/deliveryAgent.resolver");

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// Add the middleware function to the middleware stack
// app.use(verifyToken());

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, agentResolver, authResolver],
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
