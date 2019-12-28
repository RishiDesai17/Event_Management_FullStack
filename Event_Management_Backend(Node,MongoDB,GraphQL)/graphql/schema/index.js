const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Event{
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User{
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: String!
}

input UserInput{
    email: String!
    password: String!
}

input BookingInput{
    userId: String!
    eventId: String!
}

type Queries{
    getEvents: [Event!]!
    getBookings: [Booking!]!
}

type Mutations{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    newBooking(bookingInput: BookingInput): Booking
    cancelBooking(bookingInput: BookingInput): Event
}

schema {
    query: Queries
    mutation: Mutations 
}
`)