import '@babel/polyfill';

require('./common/utilities');
require('./common/redirectToMain');
require('./common/loginSignupRedirect');
require('./common/loginSignupHandler');
require('./user/dashboard');
require('./user/cart');
require('./user/payment');
require('./user/linkStudent');
require('./institute/searchStudent');
require('./institute/studentDetails');
require('./institute/viewStudents');
require('./institute/addInstituteDetails');
require('./institute/dashboard');
require('./admin/instituteManagement');
require('./institute/feesManagement');
require('./common/downloadDocument');
// keep this at the end
require('./common/errorHandler');
