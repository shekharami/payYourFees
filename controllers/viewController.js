exports.homepage = (req, res, next) => {
    // console.log(res.locals.institutes)
    res.status(200).render('home', {
        title: 'Pay your Fees | Home'
    });
    next();
};

exports.userLogin = (req, res, next) => {
    res.status(200).render('./user/userLogin', {
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
    res.status(200).render('./user/userDashboard')
    next()
};

exports.myProfile = (req, res, next) => {
    res.status(200).render('./user/myProfile')
    next()
};

exports.logout = (req, res, next) => {
    res.status(200).render('logout')
    next()
};

exports.getCheckout =  (req, res, next) => {
    res.header({ 'Content-Security-Policy': '*' }).status(200).render('./user/checkout', { key : process.env.RAZORPAY_KEY })
    next()
};

exports.addStudent = (req, res, next) => {
    res.status(200).render('./user/addStudent')
    next()
};
