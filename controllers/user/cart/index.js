const userService = require('./../services');
const cartRepositories = require('./../../../noSqlRepositories/cart');
const utils = require('./../../../utils/utils');
const mongoose = require('mongoose');
const async = require('async');
const config = require('config');

module.exports = {
  addToCart: async (req, res, next) => {
    const toCartArr = req.body;
    const funcs = [];
    if (toCartArr && Array.isArray(toCartArr) && toCartArr.length) {
      toCartArr.forEach((entry) =>
        funcs.push(async () =>
          cartRepositories.getCart({
            user: res.locals.user._id,
            institute: entry.institute,
            student: entry.student,
            findOne: true
          })
        )
      );
    }

    let cartResp = null;
    if (funcs.length) {
      cartResp = await async.parallel(funcs);
    }

    const cartRespWithStringObjIds = [];

    cartResp.forEach((cart) => {
      if (cart) {
        cartRespWithStringObjIds.push({
          student: cart.student.toString(),
          institute: cart.institute.toString(),
          lastFee: cart.lastFee ? cart.lastFee.toString() : null
        });
      }
    });
    const flag = utils.areArraysWithObjElemEqual(toCartArr, cartRespWithStringObjIds);

    if (flag) {
      return 'Data already exist in your cart.';
    }

    return await cartRepositories.addToCart(
      toCartArr.map((elem) => ({
        user: mongoose.Types.ObjectId(res.locals.user._id),
        student: mongoose.Types.ObjectId(elem.student),
        lastFee: elem && elem.lastFee ? mongoose.Types.ObjectId(elem.lastFee) : null,
        institute: mongoose.Types.ObjectId(elem.institute)
      }))
    );
  },

  getCartCount: async (req, res, next) => {
    try {
      res.locals.cartCount =
        (await cartRepositories.getCart({
          user: mongoose.Types.ObjectId(res.locals.user._id)
        })) || null;
    } catch (e) {
      console.log(e);
    }
    next();
  },

  getCartDetails: async (req, res, next) => {
    try {
      const { studentDetails, paymentDetails } = await userService.getStudentAndPaymentDeails({
        taggedStudents: res.locals.user.students
      });
      next();
    } catch (e) {
      console.log(e.stack);
    }
  },
  removeFromCart: async (req, res, next) => {
    try {
      const { student, institute, fee } = req.query;
      const whereQuery = { user: mongoose.Types.ObjectId(res.locals.user._id) };
      if (student) {
        whereQuery.student = mongoose.Types.ObjectId(student);
      }
      if (institute) {
        whereQuery.institute = mongoose.Types.ObjectId(institute);
      }
      if (fee) {
        whereQuery.fee = mongoose.Types.ObjectId(fee);
      }
      return cartRepositories.removeFromCart({ whereQuery });
    } catch (e) {
      console.log(e.stack);
    }
  }
};
