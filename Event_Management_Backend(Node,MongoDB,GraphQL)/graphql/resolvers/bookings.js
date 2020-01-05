const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {date} = require('../../helpers/date');
const {events,singleEvent,user} = require('../../helpers/index');

module.exports = {
    getBookings: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        try{
            const bookings = await Booking.find();
            return bookings.map(booking=>{
                return {...booking._doc, _id: booking._id, user: user.bind(this,booking._doc.user), event: singleEvent.bind(this,booking._doc.event), createdAt: booking._doc.createdAt, updatedAt: booking._doc.updatedAt};
            })
        }
        catch(err){
            throw err;
        }
    },
    newBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        const event = await Event.findOne({_id: args.eventId})
        // const user1 = await User.findOne({_id: args.bookingInput.userId})
        const booking= new Booking({
            user: req.userId,
            event: event
        });
        const result = await booking.save();
        return {...result._doc, _id: result.id,user: user.bind(this,result._doc.user), event: singleEvent.bind(this,result._doc.event), createdAt: result._doc.createdAt, updatedAt: result._doc.updatedAt}
    },
    cancelBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = {...booking.event._doc, _id: booking.event.id, creator: user.bind(this, booking.event._doc.creator)}
            await Booking.deleteOne({_id: args.bookingId})
            return event;
        }
        catch(err){
            throw err;
        }
    }
}