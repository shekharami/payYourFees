exports.p_homepage = (req, res, next) => {
    // console.log(res.locals.institutes)
    res.status(200).render('p_home', {
        title: 'Pay your Fees | Home'
    });
    next();
};

exports.p_userLogin = (req, res, next) => {
    res.status(200).render('p_userLogin', {
        title: 'Pay your Fees | User Login'
    });
    next();
};

exports.p_instituteLogin = (req, res, next) => {
    res.status(200).render('p_instituteLogin', {
        title: 'Pay your Fees | Institute Login'
    });
    next();
};

exports.p_userSignup = (req, res, next) => {
    res.status(200).render('p_userSignup', {
        title: 'Pay your Fees | Student Signup'
    });
    next();
};

exports.p_instituteSignup = (req, res, next) => {
    res.status(200).render('p_instituteSignup', {
        title: 'Pay your Fees | Institute Signup'
    });
    next();
};

exports.p_dashboard = (req, res, next) => {
    res.status(200).render('p_userDashboard')
    next()
};

exports.getCheckout =  (req, res, next) => {
    res.header({ 'Content-Security-Policy': '*' }).status(200).render('p_checkout', { key : process.env.RAZORPAY_KEY })
    next()
};

exports.addStudent = (req, res, next) => {
    res.status(200).render('p_addStudent')
    next()
};


exports.signup = (req, res, next) => {
   
    res.status(200).render('signup', {
        title: 'Create an account'
    });
    next();
};

exports.login = (req, res, next) => {
   
    res.status(200).render('login', {
        title: 'Login to your account'
    });
    next();
};


exports.getLogout = (req, res, next) => {
   
    res.status(200).render('logout', {
        title: 'Logged out !'
    });
    next();
};

exports.getProfile = (req, res, next) => {
    
    res.locals.flag = 1

    if(!res.locals.user){
        res.status(200).render('logout',{
            title: 'Please login first!',  
        })
    }else{
        res.status(200).render('profile', {
            title: 'My Profile'
        });
    }

    next();
};
