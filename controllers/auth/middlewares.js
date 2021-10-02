const handleRequest = require('../../utils/handler').handleRequest;
const utils = require('../../utils/utils');

module.exports = {
  inject: handleRequest(async (req, res, next) => {
    // throw utils.createErrorObject({
    //   message: 'This ia an error',
    //   status: 400
    // });

    res.locals.loo = 'bbbbbb';
  })
};
