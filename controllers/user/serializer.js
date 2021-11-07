module.exports = {
  formatStdentAndPaymentDetails: ({ studentDetails, paymentDetails }) => {
    const students = [];
    for (let i = 0; i < studentDetails.length; i++) {
      const institute = studentDetails[i].institute.map((inst) => {
        const [payment] = paymentDetails.filter(
          (payment) =>
            payment.student.toString() === studentDetails[0].id &&
            payment.institute.toString() === inst.id
        );
        return {
          id: inst.id,
          name: inst.name,
          fee: {
            id: (payment && payment.fee && payment.fee.id) || null,
            name: (payment && payment.fee && payment.fee.name) || 'NA'
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
  }
};
