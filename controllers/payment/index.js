const mongoose = require('mongoose');
const Institute = require('../../models/institutes');
const Student = require('../../models/students');
const User = require('../../models/users');
const Fees = require('../../models/fees');
const Payments = require('../../models/payments');

exports.recordCashPayment = async (req, res, next) => {
  try {
    const record = await Payments.create({
      fee: mongoose.Types.ObjectId(req.body.fee),
      student: mongoose.Types.ObjectId(req.body.studentId),
      paymentMode: req.body.mode,
      comments: req.body.note,
      amount: req.body.amount,
      paidOn: req.body.date
    });
    if (!record) {
      throw {
        message: "Couldn't record payment."
      };
    }
    console.log(record);
    res.status(201).json({
      status: 'success',
      data: {
        record
      }
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      status: 'fail',
      error: err.message
    });
  }
  next();
};
