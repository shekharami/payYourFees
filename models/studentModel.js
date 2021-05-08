const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   
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

    institute:{
        type: mongoose.Types.ObjectId
    },

    rollNo: {
        type: String
    },

    registrationNo: {
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

    enrolledOn: {
        type: Date
    },

    feesPaidTill: {
        type: Date
    },

    lastPaymentMadeOn: {
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


const Student = mongoose.model('Student', studentSchema );

module.exports = Student;