const studentRepositories = require('../../noSqlRepositories/students');
const paymentsRepositories = require('../../noSqlRepositories/payments');
const serializer = require('./serializer');
const async = require('async');

module.exports = {
  getStudentAndPaymentDeails: async ({
    taggedStudents,
    studentFields = ['name', 'gender', 'institute'],
    instituteFields = ['name'],
    paymentFields = ['fee', 'student', 'institute'],
    feeFields = ['name', 'priority', 'tag']
  }) => {
    const studentDetails = await studentRepositories.getStudents({
      whereQuery: { _id: taggedStudents },
      fields: studentFields,
      instituteFields
    });
    const funcs = [];
    studentDetails.forEach((student) => {
      if (student.institute.length) {
        student.institute.forEach((inst) => {
          funcs.push(async () =>
            paymentsRepositories.getPayment({
              whereQuery: { student: student._id, institute: inst._id },
              fields: paymentFields,
              feeFields,
              limit: 1
            })
          );
        });
      }
    });
    const paymentDetails = await async.parallel(funcs);
    return { studentDetails, paymentDetails };
  },
  getFeesToBePaid: async ({}) => {}
};
