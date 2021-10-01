import axios from 'axios';

const addFees = document.getElementById('addFees');
if (addFees) {
  addFees.addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const payBy = document.getElementById('payBy').value;
    const applicableTo = [];
    [...document.getElementsByName('applicableTo')].forEach((o) => {
      if (o.checked) {
        applicableTo.push(o.value);
      }
    });

    const res = await axios({
      method: 'POST',
      url: '/api/v1/institute/fees-management?add=true',
      data: { name, desc, amount, payBy, applicableTo },
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    if (res.data.status === 'success') {
      alert('Saved Succesfully!');
      location.assign('/institute/fees-management');
    } else {
      alert('Something went wrong !\n Try again after some time.');
    }
  });
}
