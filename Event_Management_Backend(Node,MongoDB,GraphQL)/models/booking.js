const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user:{
        
    }
})