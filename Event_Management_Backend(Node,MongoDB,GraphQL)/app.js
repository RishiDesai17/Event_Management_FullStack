const express = require('express');
const bodyParser = require('body-parser');
const graphQL = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const checkAuth = require('./middleware/check-auth');

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/eventsDB",{
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(checkAuth);

app.use('/graphql',graphQL({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))

module.exports = app;