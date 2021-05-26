const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const morgan = require('morgan');

const instituteRouter = require('./routes/instituteRouter');
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const paymentRouter = require('./routes/paymentRouter');
const studentRouter = require('./routes/studentRouter');
const instituteViewRouter = require('./routes/instituteViewRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.enable('trust proxy');

// Logger
app.use(morgan('dev'))

//implement CORS
app.use(cors());

app.options('*', cors());

app.use(helmet());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());


//data sanitixzation against xss attacks
app.use(xss());

//prevent parameter pollution
app.use(hpp({
    whitelist: ['name', 'email','item','createdAt']
}));

app.use(compression());

app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit : '10kb'  }));

app.use('/api/v1/institute', instituteRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/auth', authRouter);
app.use('/institute', instituteViewRouter);

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