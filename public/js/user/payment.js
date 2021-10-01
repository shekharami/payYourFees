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
  const [checkoutContent] = [...document.getElementsByClassName('checkout-content')];
  const students = [];
  for (let i = 0; i < 5; i++) {
    const o = JSON.parse(localStorage.getItem(`${i}`));
    if (o) {
      students.push(o);
    }
  }
  let res;
  axios({
    method: 'POST',
    url: 'api/v1/payment/createOrder',
    data: students,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => {
      if (!(res.data.status === 'success')) throw new Error('Something went wrong!');
      document.getElementById('orderId').textContent = `Order Id: ${res.data.data.razr.id}`;
      console.log(res.data);
      let html = '';
      Object.keys(res.data.data.feesDetails).forEach((name) => {
        html += `<h3 style="color:blue;">${name}</h3><p>`;
        res.data.data.feesDetails[name].details.forEach((o, i) => {
          if (!i) {
            html += `<span class='detail'>${o.name}</span>
                    <span class='price'>₹ ${o.amount}</span>`;
          } else {
            html += `<span class='detail' style='display:none;'>${o.name}</span>
                <span class='price' style='display:none;'>₹ ${o.amount}</span>`;
          }
        });
        html += '</p><hr>';
      });

      html += `<p>Total 
            <span class='price'>
                <b id='sum'>₹ ${res.data.data.total}</b>
            </span>    
        </p>
        <p>Other Charges
            <span class='price'>
                <b id='oc'>+ ₹ ${res.data.data.total * 0.02}</b>
            </span>    
        </p><hr>
        <p>Amount Payble
            <span class='price' style='color:black;'>
                <b id='total'>₹ ${res.data.data.razr.amount / 100}</b>
            </span>
        </p>
        <h6>Note: Any Charges extra is taken by the payment gateway/Bank.</h6>`;

      checkoutContent.innerHTML = html;
      document.getElementById('spinner').style.display = 'none';
      checkoutContent.style.display = '';

      proceedForPayment(res.data.data.key, res.data.data.razr.receipt, res.data.data.razr.id);
    })
    .catch((err) => {
      checkoutContent.innerHTML = `<h2>${err.message}</h2>`;
      document.getElementById('spinner').style.display = 'none';
      checkoutContent.style.display = '';
      checkoutContent.style.color = 'red';
      checkoutContent.classList.add('common-style');
      pay.style.display = 'none';
    });
}
