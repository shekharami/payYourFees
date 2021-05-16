import axios from 'axios'

const orderGenerate = document.getElementById('generate');
if(orderGenerate){
    orderGenerate.addEventListener('click', async ()=>{
        const params = {
            amount : '100',
            currency : 'INR',
            receipt : 'noreciept',
            payment_capture : '1'
        } 
        const res = await axios({  
            method: 'POST',
            url: '/api/v1/payment/order',
            data : params,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        
        if(res.data.status === 'success'){
            document.getElementById('orderId').innerText= `Order Id: ${res.data.data.id}`
        }
    })
}


const pay = document.getElementById('pay');
if(pay){
    pay.addEventListener('click', async ()=>{
        const options = {
            "key": `${document.getElementById('key').textContent.split(': ')[1]}`,
            "currency": "INR",
            "name": "WTH Coding",
            "description": "WtH Coding Transaction",
            "order_id": document.getElementById('orderId').textContent.split(': ')[1],
            "handler": async function(response) {
                // document.getElementById('1').textContent = 'Ordr pay Id : '+response.razorpay_payment_id;
                // document.getElementById('2').textContent = 'Order Id : '+response.razorpay_order_id;
                // document.getElementById('3').textContent = 'Order sig : '+response.razorpay_signature;
                
                const params = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id:   response.razorpay_order_id,
                    razorpay_signature:  response.razorpay_signature
                }

                const ax_res = await axios({  
                    method: 'POST',
                    url: '/api/v1/payment/verify',
                    data : params,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                });

                if(ax_res.data.status === 'success'){
                    document.getElementById('1').textContent = 'Payment Successful and verified'
                }
            },
            "theme": {
                "color": "#0EB9F2"
            }
        } 
        const rzp1 = new Razorpay(options);
        rzp1.open();
    })
}