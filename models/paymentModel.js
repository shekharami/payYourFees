const mongoose = require('mongoose');
const { Schema } = mongoose;
const Fees = require('./feesModel');
const Student = require('./studentModel');

const paymentSchema = new Schema({

    fee : {
        type : mongoose.Types.ObjectId,
        ref : Fees
    },

    student : {
        type : mongoose.Types.ObjectId,
        ref : Student
    },

    paymentMode : {
        type: String,
        enum: { 
            values: ['online','offline']
        }
    },

    comments : {
        type : String
    },

    paidOn : {
        type : Date,
        default : Date.now()
    },

    amount:{
        type : Number
    },

    razorpay : {
        type : mongoose.Types.ObjectId//,
        // ref : Razorpay
    },
    
    addedAt:{
        type: Date,
        default: Date.now()
    },

    deletedAt:  {
        type : Date,
        default : null
    },

    updatedAt : {
        type: Date,
        default : Date.now()
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 
    

const Payments = mongoose.model('Payments',paymentSchema );

module.exports = Payments;