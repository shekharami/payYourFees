exports.dashboard = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute){
        if(res.locals.institute.class.length){
        template = './institute/dashboard'
        }else{
        template = './institute/addInstituteDetails';
        }
    }
    res.status(200).render(template)
    next()
}

exports.addStudents = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute) template = './institute/addStudentsFileUpload';

    res.status(200).render(template)
    next()
}

exports.searchStudent = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute) template = './institute/searchStudent';
    res.status(200).render(template)
    next()
}

exports.studentDetails = (req, res, next) => {
    let template = './errorPage';
    if(res.locals.institute) template = './institute/studentDetails';

    res.status(200).render(template)
    next()
}

exports.feesManagement = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute) template = './institute/feesManagement';

    res.status(200).render(template)
    next()
}

exports.addFees = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute) template = './institute/addFees';
    res.status(200).render(template)
    next()
}

exports.profile = (req, res, next) => {
    let template = './errorPage';
    if(res.locals.institute) template = './institute/profile'
    res.status(200).render(template)
    next()
}

exports.paymentDetails = (req, res, next) => {
    let template = './errorPage';
    if(res.locals.institute) template = './institute/paymentDetails'
    res.status(200).render(template)
    next()
}

exports.reports = (req, res, next) => {
    let template = './errorPage';
    if(res.locals.institute) template = './institute/reports'
    res.status(200).render(template)
    next()
}

exports.viewStudents = (req, res, next) => {
    let template = './errorPage';
    console.log(res.locals.institute)
    if(res.locals.institute) template = './institute/viewStudents'
    res.status(200).render(template)
    next()
}