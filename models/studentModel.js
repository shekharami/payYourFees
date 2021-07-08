const mongoose = require('mongoose');
const Institute = require('./instituteModel')

const studentSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: [true, 'You should provide your name']
    },

    father : {
        type: String
    },

    mother : {
        type: String
    },

    email: {
        type: String
    },

    phone: {
        type: String
    },

    address:{
        type: String
    },

    institute:{
        type: mongoose.Types.ObjectId,
        ref : Institute
    },

    rollNo: {
        type: String
    },

    registrationNo: {
        type: String
    },

    class: {
        type: String
    },

    section:{
        type: String
    },

    programme:{
        type: String
    },

    course:{
        type: String
    },

    feesPaidTill: {
        type: Date
    },

    lastPaymentMadeOn: {
        type: Date
    },

    addedAt:{
        type: Date,
        default: Date.now(),
        select: false
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 


const Student = mongoose.model('Student', studentSchema );

module.exports = Student;