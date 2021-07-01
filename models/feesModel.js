const mongoose = require('mongoose');
const Institute = require('./instituteModel')

const feeSchema = new mongoose.Schema({

    institute:{
        type: mongoose.Types.ObjectId,
        ref : Institute,
    },

    name: {
        type: String,
        required: [true, 'Must have a name']
    },

    desc: {
        type: String
    },

    amount : {
        type : Number,
        required : [true]
    },

    classes: {
        type: [String]
    },

    programme:{
        type: [String]
    },

    course:{
        type: [String]
    },

    active : {
        type : Boolean,
        default : true
    },

    payBy : {
        type: Date
    },

    addedAt:{
        type: Date,
        default: Date.now()
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 

const Fees = mongoose.model('Fees',feeSchema );

module.exports = Fees;