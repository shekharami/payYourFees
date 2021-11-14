const Institute = require('../../models/institutes');
const User = require('../../models/users');
const mongoose = require('mongoose');
const userRepositories = require('../../noSqlRepositories/users');
const services = require('./services');
const serializer = require('./serializer');

exports.getUser = async (req, res, next) => {
  try {
    user = res.locals.user;
    if (user) {
      const data = await Institute.find({ email: user.email }).sort({ createdAt: -1 });
      res.locals.data = data;
      return next();
    } else {
      const data = await Institute.find({ email: req.body.email }).sort({ createdAt: -1 });

      res.status(200).json({
        status: 'success',
        data: {
          length: data.length,
          data
        }
      });
    }
  } catch (err) {
    console.log(err);
  }

  next();
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!res.locals.user) throw new Error('Please login to continue');
    let user;
    if (req.body.action.add) {
      user = await User.findByIdAndUpdate(
        res.locals.user._id,
        {
          $push: { students: req.body.students }
        },
        { new: true, runValidators: true }
      );
    } else if (req.body.action.remove) {
      user = await User.findByIdAndUpdate(
        res.locals.user._id,
        {
          $pull: { students: req.body.students }
        },
        { new: true, runValidators: true }
      );
    }
    res.status(200).json({
      status: 'success',
      user
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

exports.taggedStudentDetails = async (req, res, next) => {
  try {
    // instead of above use config.get('contants.months') months
    if (!res.locals.user) return next();

    const taggedStudents = res.locals.user.students;

    if (!taggedStudents.length) return next();

    res.locals.students = serializer.formatStudentAndPaymentDetails(
      await services.getStudentAndPaymentDeails({
        taggedStudents: res.locals.user.students
      })
    );
  } catch (err) {
    console.log(err.stack);
  }
  next();
};
