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

type AuthData{
    userId: ID!
    token: String!
    tokenExpiry: Int!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: String
}

input UserInput{
    email: String!
    password: String!
}

input BookingInput{
    userId: String!
    eventId: String!
}

input CancelBookingInput{
    bookingId: String!
}

type Queries{
    getEvents: [Event!]!
    getBookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type Mutations{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    newBooking(eventId: ID!): Booking
    cancelBooking(bookingId: ID!): Event
}

schema {
    query: Queries
    mutation: Mutations 
}
`)