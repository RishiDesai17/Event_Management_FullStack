const express = require('express');
const bodyParser = require('body-parser');
const graphQL = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');

const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/eventsDB",{
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use('/graphql',graphQL({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type Queries{
            getEvents: [Event!]!
        }

        type Mutations{
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: Queries
            mutation: Mutations 
        }
    `),
    rootValue: {
        getEvents: () => {
            return Event.find().exec().then(docs=>{
                return docs.map(event=>{
                    return {...event._doc, _id: event.id};
                })
            }).catch((err)=>{
                console.log(err);
            })
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date) 
            })
            return event.save().then((result)=>{
                console.log(result);
                return {...result._doc,_id: event.id};
            }).catch((err)=>{
                console.log(err);
                throw err;
            })
        }
    },
    graphiql: true
}))

module.exports = app;