module.exports = {
  handleRequest: (callback) => async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      return res.status(error.hasOwnProperty('status') ? error.status : 500).json({
        status: 'fail',
        error: error.hasOwnProperty('stack')
          ? error.stack
          : error.hasOwnProperty('message')
          ? error.message
          : null
      });
    }
    next();
  }
};
