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
// mongoose.connect("mongodb+srv://admin-rishi:m0ng00se@cluster0-rtpri.mongodb.net/events",{
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });
mongoose.Promise = global.Promise;

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','*');//Origin, X-Requested-With, Content-Type, Accept, Authorization
  res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
  if(req.method==='OPTIONS'){
    return res.sendStatus(200);
  }
  next();
})

app.use(checkAuth);

app.use('/graphql',graphQL({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))

module.exports = app;