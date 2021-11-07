const studentRepositories = require('../../noSqlRepositories/students');
const paymentsRepositories = require('../../noSqlRepositories/payments');
const async = require('async');

module.exports = {
  getStudentAndPaymentDeails: async ({ taggedStudents }) => {
    const studentDetails = await studentRepositories.getStudents({
      whereQuery: { _id: taggedStudents },
      fields: ['name', 'gender', 'institute'],
      instituteFields: ['name']
    });
    const funcs = [];
    studentDetails.forEach((student) => {
      if (student.institute.length) {
        student.institute.forEach((inst) => {
          funcs.push(async () =>
            paymentsRepositories.getPayment({
              whereQuery: { student: student._id, institute: inst._id },
              fields: ['fee', 'student', 'institute'],
              feeFields: ['name'],
              limit: 1
            })
          );
        });
      }
    });
    const paymentDetails = await async.parallel(funcs);
    return { studentDetails, paymentDetails };
  }
};
