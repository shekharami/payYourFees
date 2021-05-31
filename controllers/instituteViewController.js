exports.dashboard = (req, res, next) => {
    let template = './errorPage';

    if(res.locals.institute){
        if(res.locals.institute.class.length){
        template = './institute/instituteDashboard'
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