exports.dashboard = (req, res, next) => {
    res.status(200).render('./institute/instituteDashboard')
    next()
}