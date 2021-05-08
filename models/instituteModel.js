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
        unique: true,
        required: [true, 'you must provide an email']
    },

    phone: {
        type: [String]
    },

    addressLine1:{
        type: String
    },

    addressLine2:{
        type: String
    },

    addressLine3:{
        type: String
    },

    addressCity:{
        type: String
    },

    addressDistrict:{
        type: String
    },

    addressPinCode:{
        type: Number
    },

    addressState:{
        type: String
    },

    class: {
        type: [String]
    },

    programme:{
        type: [String]
    },

    course:{
        type: [String]
    },

    addedAt:{
        type: Date,
        default: Date.now()
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 


const Institute = mongoose.model('Institute',instituteSchema );

module.exports = Institute;