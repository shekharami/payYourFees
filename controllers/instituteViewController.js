exports.dashboard = (req, res, next) => {
    let template = './institute/addInstituteDetails';
    if(res.locals.institute.class.length){
        template = './institute/instituteDashboard'
    }
    res.status(200).render(template)
    next()
}