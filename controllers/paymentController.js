const mongoose = require('mongoose')
const Institute = require('../models/instituteModel')
const Student = require('./../models/studentModel')
const User = require('./../models/userModel')
const Fees = require('./../models/feesModel')
const Payments = require('./../models/paymentModel')

exports.recordCashPayment = async (req, res, next) => {
    try{
        const record = await Payments.create(
            { 
                fee : mongoose.Types.ObjectId(req.body.fee),
                student : mongoose.Types.ObjectId(req.body.studentId),
                paymentMode : req.body.mode,
                comments : req.body.note,
                amount : req.body.amount,
                paidOn : req.body.date
            }
        )
        if(!record){
            throw {
                message : "Couldn't record payment."
            }
        }
        console.log(record)
        res.status(201).json({
            status: 'success',
            data : {
                record
            }
        })

    }catch(err){
        console.log(err)
        
        res.status(401).json({
            status:"fail",
            error: err.message
        })
    }
    next();
};