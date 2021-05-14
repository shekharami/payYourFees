exports.p_homepage = async (req, res, next) => {
    // console.log(res.locals.institutes)
    res.status(200).render('p_home', {
        title: 'Pay your Fees | Home'
    });
    next();
};

exports.p_userLogin = async (req, res, next) => {
    res.status(200).render('p_userLogin', {
        title: 'Pay your Fees | User Login'
    });
    next();
};

exports.p_instituteLogin = async (req, res, next) => {
    res.status(200).render('p_instituteLogin', {
        title: 'Pay your Fees | Institute Login'
    });
    next();
};

exports.p_userSignup = async (req, res, next) => {
    res.status(200).render('p_userSignup', {
        title: 'Pay your Fees | Student Signup'
    });
    next();
};

exports.p_instituteSignup = async (req, res, next) => {
    res.status(200).render('p_instituteSignup', {
        title: 'Pay your Fees | Institute Signup'
    });
    next();
};

exports.p_dashboard = async (req, res, next) => {
    res.status(200).render('p_userDashboard')
}

exports.getHome = async (req, res, next) => {
    res.status(200).render('home', {
        title: 'Notes | Home'
    });
    next();
};

exports.getNotes = async (req, res, next) => {

    res.status(200).render('myNotes', {
        title: 'My Notes'
    });
    
    next();
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
