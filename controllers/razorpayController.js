const path = require('path')
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const crypto = require("crypto");
const Razorpay = require("razorpay");

exports.createOrder = async (req, res, next) => {
  try{

      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const feesDetails = res.locals.feesDetails

      delete res.locals.feesDetails
      let amount = []
      let receipt = ''
      Object.keys(feesDetails).map(name => {
        amount.push(feesDetails[name].details[0].amount)
        receipt += `${name}-${feesDetails[name].details[0].name} `
      })

      receipt = receipt.split(' ')
      receipt.pop()
      
      receipt = receipt.join('|')

      console.log(receipt)
      
      //calculate total amount
      amount = amount.reduce((a,b) => a+b)
      const total = amount
      //add razorpay's cut
      amount += amount * 0.02
      amount.toFixed(2) //rounding to  decimal places

      const params = { 
        amount : amount*100, // total feesamount
        currency: "INR",
        receipt, //name of fees
        payment_capture: '1'
      }
      
      const razr = await instance.orders.create(params)

      console.log(razr)
      
      res.status(200).json({
        status : 'success',
        data:{
          total ,
          feesDetails ,
          razr,
          key : process.env.RAZORPAY_KEY
        }
      })

  }catch(err){

    console.log(err.stack)

    res.status(200).json({ 
      status: "fail",
      error : err.message
    });
  }

  next()

};

exports.verifyPayment = async (req, res, next) => {

  // dotenv.config({ path: path.join(__dirname, 'razor.env') });
  // let app = express();
  //Middlewares
  // app.use(cors());
  // app.use(express.json());
  // app.use(
  //   bodyParser.urlencoded({
  //     extended: false,
  //   })
  // );
  // app.use(bodyParser.json());
  // app.set("view engine", "ejs");
  
  //Routes

  // send razorpay key to the template-------------------------
  // app.get("/payments", (req, res) => {
  //   res.render("payment.ejs", { key: process.env.KEY });
  // });
  
    const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  
    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);

    let response = { status: "failure" };
    if (expectedSignature === req.body.razorpay_signature)
      response = { status: "success" };
    res.status(200).json(response);
  
  next()
}