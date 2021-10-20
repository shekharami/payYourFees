exports.homepage = (req, res, next) => {
  // console.log(res.locals.institutes)
  // res.status(200).render('home', {
  res.status(200).render('home', {
    title: 'Pay your Fees | Home'
  });
  next();
};

exports.userLogin = (req, res, next) => {
  res.status(200).set('Content-Security-Policy', "script-src 'self' *").render('./user/userLogin', {
    title: 'Pay your Fees | User Login'
  });
  next();
};

exports.instituteLogin = (req, res, next) => {
  res.status(200).render('./institute/instituteLogin', {
    title: 'Pay your Fees | Institute Login'
  });
  next();
};

exports.userSignup = (req, res, next) => {
  res.status(200).render('./user/userSignup', {
    title: 'Pay your Fees | Student Signup'
  });
  next();
};

exports.instituteSignup = (req, res, next) => {
  res.status(200).render('./institute/instituteSignup', {
    title: 'Pay your Fees | Institute Signup'
  });
  next();
};

exports.dashboard = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/userDashboard';
  res.status(200).render(template);
  next();
};

exports.myProfile = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/myProfile';
  res.status(200).render(template);
  next();
};

exports.paymentHistory = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/paymentHistory';
  res.status(200).render(template);
  next();
};

exports.logout = (req, res, next) => {
  res.status(200).render('logout');
  next();
};

exports.getCheckout = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/checkout';
  res
    .header({ 'Content-Security-Policy': 'https://checkout.razorpay.com' })
    .status(200)
    .render(template);
  next();
};

exports.linkStudent = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/linkStudent';
  res.status(200).render(template);
  next();
};

exports.getCart = (req, res, next) => {
  let template = './errorPage';
  if (res.locals.user) template = './user/cart';
  res.status(200).render(template);
  next();
};
