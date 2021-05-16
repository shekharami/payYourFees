const path = require('path')
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const crypto = require("crypto");
const Razorpay = require("razorpay");

exports.createOrder = (req, res, next) => {

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const params = { ...req.body };
  instance.orders
    .create(params)
    .then((data) => {
      res.status(200).json({ 
        status: "success",
        data 
      });
    })
    .catch((error) => {
      res.status(200).json({ 
        status: "fail",
        error 
      });
    });
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