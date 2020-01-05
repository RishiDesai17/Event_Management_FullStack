const Event = require('../../models/event');
const User = require('../../models/user');
const {date} = require('../../helpers/date');
const {user} = require('../../helpers/index');

module.exports = {
    getEvents: async () => {
        try{
            const events = await Event.find();
            return events.map(event=>{
                return {...event._doc, _id: event.id, creator: user.bind(this,event._doc.creator), date: event._doc.date};
            })
        }
        catch(err){
            throw err;
        }
    },
    createEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
            creator: req.userId
        })
        let createdEvent;
        try{
            const result = await event.save();
            createdEvent = {...result._doc,_id: event.id, date: event._doc.date,creator: user.bind(this,event._doc.creator)};
            const creator = await User.findById(req.userId);
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
}