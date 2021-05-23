exports.dashboard = (req, res, next) => {
    res.status(200).render('p_instituteDashboard')
    next()
}