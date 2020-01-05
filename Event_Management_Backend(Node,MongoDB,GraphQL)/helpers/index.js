const Event = require('../models/event');
const User = require('../models/user');
const {date} = require('./date');

const events = async (eventIds) => {
    try{
        const events = await Event.find({_id: {$in: eventIds}});
        return events.map(event=>{
            return {...event._doc, _id: event.id, creator: user.bind(this,event.creator), date: event._doc.date}
        })
    }
    catch(err){
        throw err;
    }
}

const singleEvent = async (eventId) => {
    try{
        const event = await Event.findById(eventId);
        return {...event._doc, _id: event.id, creator: user.bind(this, event.creator), date: event._doc.date};
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

exports.events = events;
exports.singleEvent = singleEvent;
exports.user = user;