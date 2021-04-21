const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    instituteType:{
        type: String
    },

    name: {
        type: String,
        required: [true, 'You should provide your name']
    },

    email: {
        type: String,
        required: [true, 'you must provide an email']
    },

    phone: {
        type: [String]
    },

    address:{
        type: String
    },

    addedAt:{
        type: Date,
        default: Date.now()
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 


const Institute = mongoose.model('Notes',instituteSchema );

module.exports = Institute;