const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const events = async (eventIds) => {
    try{
        const events = await Event.find({_id: {$in: eventIds}});
        return events.map(event=>{
            return {...event._doc, _id: event.id, creator: user.bind(this,event.creator), date: new Date(event._doc.date).toISOString()}
        })
    }
    catch(err){
        throw err;
    }
}

const singleEvent = async (eventId) => {
    try{
        const event = await Event.findById(eventId);
        return {...event._doc, _id: event.id, creator: user.bind(this, event.creator)};
    }
    catch(err){
        throw err;
    }
}

const user = async (userId) => {
    try{
        const user = await User.findById(userId);
        return {...user._doc, _id: user._id, createdEvents: events.bind(this,user._doc.createdEvents)}    
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    getEvents: async () => {
        try{
            const events = await Event.find();
            return events.map(event=>{
                return {...event._doc, _id: event.id, creator: user.bind(this,event._doc.creator), date: new Date(event._doc.date).toISOString()};
            })
        }
        catch(err){
            throw err;
        }
    },
    getBookings: async () => {
        try{
            const bookings = await Booking.find();
            return bookings.map(booking=>{
                return {...booking._doc, _id: booking._id, user: user.bind(this,booking._doc.user), event: singleEvent.bind(this,booking._doc.event), createdAt: new Date(booking._doc.createdAt.toISOString()), updatedAt: new Date(booking._doc.updatedAt.toISOString())};
            })
        }
        catch(err){
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: args.eventInput.creator
        })
        let createdEvent;
        try{
            const result = await event.save();
            createdEvent = {...result._doc,_id: event.id, date: new Date(event._doc.date).toISOString(),creator: user.bind(this,event._doc.creator)};
            const creator = await User.findById(args.eventInput.creator);
            if(!creator){
                throw new Error("User does not exist")
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        }
        catch(err){
            throw err;
        }
    },
    createUser: async (args)=>{
        try{
            const user = await User.findOne({email: args.userInput.email});
            if(user){
                throw new Error("User exists")
            }
            const hash = await bcrypt.hash(args.userInput.password,10)    
            const newUser = new User({
                email: args.userInput.email,
                password: hash
            });
            const result = await newUser.save()
            return {...result._doc, password: "***", _id: result.id}
        }
        catch(err){
            throw err;
        }
    },
    newBooking: async (args) => {
        const booking= new Booking({
            user: args.bookingInput.userId,
            event: args.bookingInput.eventId
        });
        const result = await booking.save();
        return {...result._doc, _id: result.id,user: user.bind(this,result._doc.user), event: singleEvent.bind(this,result._doc.event), createdAt: new Date(result._doc.createdAt.toISOString()), updatedAt: new Date(result._doc.updatedAt.toISOString())}
    },
    cancelBooking: async (args) => {

    }
}