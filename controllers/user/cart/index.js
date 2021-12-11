const userService = require('./../services');
const cartRepositories = require('./../../../noSqlRepositories/cart');
const instituteRepositories = require('./../../../noSqlRepositories/institutes');
const utils = require('./../../../utils/utils');
const mongoose = require('mongoose');
const async = require('async');
const config = require('config');
const { getFee } = require('./../../../noSqlRepositories/institutes');

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
      const savedCart = await cartRepositories.getCart({
        user: mongoose.Types.ObjectId(res.locals.user._id),
        findAll: true
      });
      let feeWithHigherPriority = {};
      savedCart.forEach((item) => {
        feeWithHigherPriority[item.institute.name] = [];
      });
      if (savedCart.length) {
        savedCart.forEach((item) => {
          feeWithHigherPriority[item.institute.name] = async () =>
            instituteRepositories.getFee({
              whereQuery: {
                institute: item.institute._id,
                priority: item.lastFee ? item.lastFee.priority + 1 : { $gt: 0 },
                classes: { $elemMatch: { $eq: item.student.class } },
                deletedAt: null,
                active: true
              }
            });
        });
      }
      feeWithHigherPriority = await async.parallel(feeWithHigherPriority);
      const lateFeeFuncs = {};
      let lateFees = null;
      console.log('------', savedCart[0], '-----');
      const cartDetails = savedCart.map((item) => {
        // If time lapsed, check for late fees to be included
        if (
          feeWithHigherPriority[item.institute.name].length &&
          feeWithHigherPriority[item.institute.name].length < 12
        ) {
          feeWithHigherPriority[item.institute.name].forEach((fee) => {
            if (fee.payBy < Date.now() && !lateFeeFuncs[item.institute.name]) {
              lateFeeFuncs[item.institute.name] = async () =>
                getFee({
                  whereQuery: {
                    institute: item.institute._id,
                    tag: config.get('fees.tags.FINE') //later change it to LATE_FEE
                  }
                });
            }
          });
        }
        //
        return {
          student: { name: item.student.name.toUpperCase(), id: item.student.id },
          institute: {
            name: item.institute.name,
            id: item.institute.id,
            fees: feeWithHigherPriority[item.institute.name]
          }
        };
      });

      //find late fees for institute
      if (Object.keys(lateFeeFuncs).length) {
        lateFees = await async.parallel(lateFeeFuncs);
      }

      // push late fees array to insttute fees array
      if (Object.keys(lateFees).length) {
        Object.keys(lateFees).forEach((inst) => {
          cartDetails
            .filter((obj) => obj.institute.name === inst)[0]
            .institute.fees.push(...lateFees[inst]);
        });
      }
      res.locals.cartDetails = cartDetails;
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
