const path = require('path');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const config = require('config');

exports.createOrder = async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: config.get('razorpay.key'),
      key_secret: config.get('razorpay.secret')
    });
    const params = {
      amount: parseInt(req.body.amount) * 100, // total feesamount
      currency: 'INR',
      receipt: req.body.receipt, //name of fees
      payment_capture: '1'
    };

    const razr = await instance.orders.create(params);

    console.log(razr);

    res.status(200).json({
      status: 'success',
      data: {
        razr,
        key: config.get('razorpay.key')
      }
    });
  } catch (err) {
    console.log(err.stack);

    res.status(200).json({
      status: 'fail',
      error: err.message
    });
  }

  next();
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
  //   res.render("payment.ejs", { key: config.get('razorpay.key') });
  // });

  const body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac('sha256', config.get('razorpay.secret'))
    .update(body.toString())
    .digest('hex');

  console.log('sig' + req.body.razorpay_signature);
  console.log('sig' + expectedSignature);

  let response = { status: 'failure' };
  if (expectedSignature === req.body.razorpay_signature) response = { status: 'success' };
  res.status(200).json(response);

  next();
};
