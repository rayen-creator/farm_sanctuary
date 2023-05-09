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
//test api cal

//all resolvers
const authResolver = require("./src/resolvers/auth.resolver");
const userResolver = require("./src/resolvers/user.resolver");
const verifyToken = require("./src/middleware/authJwt");
const agentResolver = require("./src/resolvers/deliveryAgent.resolver");
const productResolver = require("./src/resolvers/product.resolver");
const feedbackResolver = require("./src/resolvers/feedback.resolver");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const recommendedproductresolvers = require("./src/resolvers/RecommendedProduct.resolver");
const postResolver = require("./src/resolvers/post.resolver");
const commentResolver = require("./src/resolvers/comment.resolver");
const createBadgesMiddleware = require("./src/middleware/initilize_badges");
const badgeResolver=require("./src/resolvers/badge.resolver");
const notificationResolver=require("./src/resolvers/notification.resolver");
const orderResolver = require("./src/resolvers/order.resolver");
const eventResolver=require('./src/resolvers/event.resolver');
const mapResolver = require("./src/resolvers/map.resolver");
const carbonResolver = require("./src/resolvers/CarbonEmissions.resolver");
const scenarioResolver = require("./src/resolvers/scenario.resolver");
const scenarioEventResolver = require("./src/resolvers/scenarioEvent.resolver");


app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//Initialize badges
createBadgesMiddleware.createBadges();

const server = new ApolloServer({
  typeDefs,
  resolvers: [
    userResolver,
    authResolver,
    feedbackResolver,
    agentResolver,
    productResolver,
    postResolver,
    commentResolver,
    badgeResolver,
    recommendedproductresolvers,
    notificationResolver,
    orderResolver,
    eventResolver,
    mapResolver,
    carbonResolver, 
    scenarioResolver, 
    scenarioEventResolver,
    

  ],
});

async function startApolloServer() {
  app.use(graphqlUploadExpress());

  await server.start();
  server.applyMiddleware({ app });
  
}

startApolloServer();

const PORT = process.env.PORT || 4000;
app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
