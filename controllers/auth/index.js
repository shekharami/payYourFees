const jwt = require('jsonwebtoken');
const { type } = require('os');
const { format } = require('path');
const { promisify } = require('util');
const Institute = require('../../models/institutes');
const User = require('../../models/users');
// const { use } = require('../routes/userRouter');

const createTokenSendCookie = function (id, type, req, res) {
  const token = jwt.sign({ id, type }, 'This is pay your fees secret key for JWT');
  res.cookie('jwt', token, {
    /*
        expires: new Date(Date.now() + config.get('jwt.expiresIn) * 24 * 60 * 60 *  1000),*/
    httpOnly: true,
    secure: req.secure /*|| req.headers('x-forwarded-proto') === 'https'*/
  });
  return token;
};

exports.signUp = async (req, res, next) => {
  try {
    let data, token;
    switch (req.body.type) {
      case 'user': {
        const user = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          addressDistrict: req.body.district,
          addressPincode: req.body.pincode,
          addressState: req.body.state,
          // institute : req.body.institute,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        };

        data = await User.create(user);

        if (!data) {
          throw new Error('Something went wrong');
        }

        token = createTokenSendCookie(data._id, 'user', req, res);

        break;
      }

      case 'institute': {
        const institute = {
          instituteType: req.body.instituteType,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          addressDistrict: req.body.district,
          addressPincode: req.body.pincode,
          addressState: req.body.state,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        };

        data = await Institute.create(institute);

        if (!data) {
          throw new Error('Something went wrong');
        }

        token = createTokenSendCookie(data._id, 'institute', req, res);

        break;
      }
    }

    res.status(201).json({
      status: 'success',
      token,
      data
    });
    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({
      status: 'fail',
      error: err.stack
    });
  }
};

// exports.updateUser = async (req, res, next) => {
//     try{

//         const data = {
//             name : req.body.name,
//             email : req.body.email
//         }

//         if(!data){
//             throw new Error('Something went wrong')
//         }

//         const user = await User.findByIdAndUpdate(req.body.id, data ,{new: true, runValidators: true})

//         res.status(201).json({
//             status: 'success',
//             user
//         })

//         next();

//     }catch(err){
//         console.log(err)

//         res.status(401).json({
//             status:"fail",
//             error: err.stack
//         })
//     }

// };

exports.logIn = async (req, res, next) => {
  try {
    let token, query;

    switch (req.body.type) {
      case 'user': {
        const { phone, email, password } = req.body;

        if ((!phone && !email) || !password) {
          throw new Error('Provide email or phone and password');
        }

        query = User.find();
        if (phone) {
          query.find({ phone: phone });
        } else if (email) {
          query.find({ email: email });
        }

        const [user] = await query.select('+password');

        if (!user) {
          throw new Error('User does not exist');
        }

        const checkPass = await user.correctPassword(password, user.password);

        if (!checkPass) {
          throw new Error('Invalid password');
        }

        token = createTokenSendCookie(user._id, 'user', req, res);

        break;
      }
      case 'institute': {
        query = Institute.find({ email: req.body.email });

        const [institute] = await query.select('+password');

        if (!institute) {
          throw new Error('Institute does not exist');
        }

        const checkPass = await institute.correctPassword(req.body.password, institute.password);

        if (!checkPass) {
          throw new Error('Invalid password');
        }

        token = createTokenSendCookie(institute._id, 'institute', req, res);

        break;
      }
    }

    res.status(200).json({
      status: 'success',
      token
    });

    next();
  } catch (err) {
    if ('ValidationError' in err) {
      console.log('---------------------------------');
    }
    console.log(err.stack);

    res.status(401).json({
      status: 'fail',
      error: err
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        'This is pay your fees secret key for JWT'
      );

      let freshUser;

      if (decoded.type === 'user') {
        freshUser = await User.findById(decoded.id);
        res.locals.user = freshUser;
      } else if (decoded.type === 'institute') {
        freshUser = await Institute.findById(decoded.id);
        const arr = [];
        res.locals.institute = freshUser;
        if (freshUser.instituteType === 'school') {
          freshUser.class.forEach((cls) => {
            arr.push(JSON.parse(cls));
          });
          res.locals.institute.parsedClass = arr;
        }
      }

      if (!freshUser) {
        return next();
      }
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  });
  // .status(200)
  // .json({ status: 'success' });

  next();
};
