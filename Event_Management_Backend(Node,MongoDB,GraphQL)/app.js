const express = require('express');
const bodyParser = require('body-parser');
const graphQL = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(bodyParser.json());

app.use('/graphql',graphQL({
    schema: buildSchema(`
        type Queries{
            getEvents: [String!]!
        }

        type Mutations{
            createEvent(name: String): String
        }

        schema {
            query: Queries
            mutation: Mutations 
        }
    `),
    rootValue: {
        getEvents: () => {
            return ['travel','Music'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}))

module.exports = app;