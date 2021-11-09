const config = require('config');

module.exports = {
  formatStudentAndPaymentDetails: ({ studentDetails, paymentDetails }) => {
    const students = [];
    for (let i = 0; i < studentDetails.length; i++) {
      const institute = studentDetails[i].institute.map((inst) => {
        const [payment] = paymentDetails.filter(
          (payment) =>
            payment.student.toString() === studentDetails[0].id &&
            payment.institute.toString() === inst.id
        );
        const selectedFee =
          payment &&
          Array.isArray(payment.fee) &&
          payment.fee.length &&
          payment.fee.filter((fee) => fee.tag === config.get('fees.tags.TUTION_FEE'))[0];
        return {
          id: inst.id,
          name: inst.name,
          fee: {
            id: selectedFee.id || null,
            name: selectedFee.name || 'N/A',
            desc: selectedFee.desc || 'N/A',
            amount: selectedFee.amount || 0
          }
        };
      });

      students.push({
        id: studentDetails[i].id,
        name: studentDetails[i].name,
        gender: studentDetails[i].gender || 'M',
        institute
      });
    }
    return students;
  },

  formatCart: ({ studentDetails, paymentDetails }) => {}
};
