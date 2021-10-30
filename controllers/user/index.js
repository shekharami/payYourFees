const Institute = require('../../models/institutes');
const User = require('../../models/users');
const Student = require('../../models/students');
const mongoose = require('mongoose');
const utils = require('../../utils/utils');
const userRepositories = require('../../noSqlRepositories/users');
const studentRepositories = require('../../noSqlRepositories/students');

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
    const months = {
      1: 'JAN',
      2: 'FEB',
      3: 'Mar',
      4: 'APR',
      5: 'MAY',
      6: 'JUN',
      7: 'JUL',
      8: 'AUG',
      9: 'SEP',
      10: 'OCT',
      11: 'NOV',
      12: 'DEC'
    };
    // instead of above use config.get('contants.months') months
    if (!res.locals.user) return next();

    // const taggedStudents = res.locals.user.students;

    // if (!taggedStudents.length) return next();

    // const studentDetails = await Student.find({ _id: taggedStudents }).populate('institute').lean();

    // let month, year;
    // for (let i = 0; i < studentDetails.length; i++) {
    //   delete studentDetails[i].addedAt;
    //   delete studentDetails[i].__v;
    //   month = studentDetails[i].feesPaidTill.getMonth() + 1;
    //   year = studentDetails[i].feesPaidTill.getFullYear();
    //   res.locals.user.students[i] = studentDetails[i];
    //   res.locals.user.students[i].feesPaidTill = `${months[month]}-${year}`;
    // }
    const taggedStudents = res.locals.user.students;

    if (!taggedStudents.length) return next();

    const studentDetails = await studentRepositories.getStudents({
      whereQuery: { _id: taggedStudents },
      fields: ['name', 'gender', 'institute'],
      instituteFields: ['name']
    });
    // if(studentDetails && Array.isArray(studentDetails)){

    // }

    // let month, year;
    for (let i = 0; i < studentDetails.length; i++) {
      // delete studentDetails[i].addedAt;
      // delete studentDetails[i].__v;
      // month = studentDetails[i].feesPaidTill.getMonth() + 1;
      // year = studentDetails[i].feesPaidTill.getFullYear();
      res.locals.user.students[i] = studentDetails[i];
      // res.locals.user.students[i].feesPaidTill = `${months[month]}-${year}`;
    }
  } catch (err) {
    console.log(err.stack);
  }
  next();
};

exports.addToCart = async (req, res, next) => {
  const model = {
    student: req.body.student && mongoose.Types.ObjectId(req.body.student),
    institutes:
      req.body.institutes &&
      Array.isArray(req.body.institutes) &&
      req.body.institutes.map((inst) => mongoose.Types.ObjectId(inst)),
    user: res.locals.user._id
  };

  // let { student } = req.body,
  //   userId = res.locals.user._id;
  // utils.areRequiredFieldsPresent({ userId, student });
  // const cart = await userRepositories.getCart({ user: mongoose.Types.ObjectId(model.user) });
  // const students = [
  //   ...new Set([...(cart ? cart.students.map((stud) => stud._id.toString()) : []), student])
  // ].map((stud) => mongoose.Types.ObjectId(stud));
  return userRepositories.addToCart(model);
  //   {
  //     user: mongoose.Types.ObjectId(userId)
  //   },
  //   {
  //     user: mongoose.Types.ObjectId(userId),
  //     students
  //   }
  // );
};

exports.getCartDetails = async (req, res, next) => {
  try {
    res.locals.cart =
      (await userRepositories.getCart({
        user: mongoose.Types.ObjectId(res.locals.user._id),
        populate: true
      })) || null;
  } catch (e) {
    console.log(e);
  }
  next();
};
