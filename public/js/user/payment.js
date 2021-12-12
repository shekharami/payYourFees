import axios from 'axios';

const orderGenerate = document.getElementById('generate');
if (orderGenerate) {
  orderGenerate.addEventListener('click', async () => {
    const params = {
      amount: '100',
      currency: 'INR',
      receipt: 'noreciept',
      payment_capture: '1'
    };
    const res = await axios({
      method: 'POST',
      url: '/api/v1/payment/order',
      data: params,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    if (res.data.status === 'success') {
      document.getElementById('orderId').innerText = `Order Id: ${res.data.data.id}`;
    }
  });
}

const proceedForPayment = (key, name, orderId) => {
  const pay = document.getElementById('pay');
  if (pay) {
    pay.addEventListener('click', async () => {
      const options = {
        key: key,
        currency: 'INR',
        name: name, //change it to payment for which month
        description: 'Fees Payment',
        order_id: orderId,
        handler: async function (response) {
          const params = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          };

          const ax_res = await axios({
            method: 'POST',
            url: '/api/v1/payment/verify',
            data: params,
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });

          if (ax_res.data.status === 'success') {
            document.getElementById('1').textContent = 'Payment Successful and verified';
          }
        },
        theme: {
          color: '#0EB9F2'
        }
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    });
  }
};

const [checkoutTable] = [...document.getElementsByClassName('checkout-table')];
if (checkoutTable) {
  const data = {};
  data.amount = sessionStorage.getItem('amount');
  data.receipt = sessionStorage.getItem('receipt');
  if (!data.amount || !data.receipt) {
    alert('Something went wrong!');
    location.assign('/cart');
  }
  axios({
    method: 'POST',
    url: 'api/v1/payments/createOrder',
    data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => {
      if (!(res.data.status === 'success')) throw new Error('Something went wrong!');
      document.getElementById('orderId').textContent = `Order Id: ${res.data.data.razr.id}`;
      console.log(res.data);
      document.getElementById('orderId').innerText = res.data.data.razr.id;
      document.getElementById('amount').innerText = `₹ ${res.data.data.razr.amount / 100}`;

      // checkoutContent.innerHTML = html;
      // document.getElementById('spinner').style.display = 'none';
      // checkoutContent.style.display = '';

      proceedForPayment(res.data.data.key, res.data.data.razr.receipt, res.data.data.razr.id);
    })
    .catch((err) => {
      // checkoutContent.innerHTML = `<h2>${err.message}</h2>`;
      // document.getElementById('spinner').style.display = 'none';
      // checkoutContent.style.display = '';
      // checkoutContent.style.color = 'red';
      // checkoutContent.classList.add('common-style');
      // pay.style.display = 'none';
      console.log(err);
    });
}
