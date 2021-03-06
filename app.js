const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const instituteRouter = require('./routes/institute');
const adminViewRouter = require('./routes/view/admin');
const viewRouter = require('./routes/view/index');
const userRouter = require('./routes/user');
const paymentRouter = require('./routes/payment');
const studentRouter = require('./routes/student');
const instituteViewRouter = require('./routes/view/institute');
const authRouter = require('./routes/auth');

const app = express();

app.enable('trust proxy');

// Logger
app.use(morgan('dev'));

//implement CORS
// app.use(cors());

app.options('*', cors());

app.use(helmet());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());

//data sanitixzation against xss attacks
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: ['name', 'email', 'item', 'createdAt']
  })
);

app.use(compression());

app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/institute', instituteRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/auth', authRouter);
app.use('/institute', instituteViewRouter);

app.use('/admin', adminViewRouter);
app.use('/', viewRouter);
/*
app.all('*', (req, res, next) => {
    try{
        res.status(404).end('Route is not defined. Error 404')
    }catch(err){
        console.log(err)
    }
    
    next();
});
*/
module.exports = app;
