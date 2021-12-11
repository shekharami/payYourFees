import axios from 'axios';
const checkout = document.getElementById('checkout');
if (checkout) {
  checkout.onclick = () => {
    const alertError = () => alert('Something went wrong!');
    const amount = checkout.value.split(' ').pop();
    if (amount && checkout.name) {
      sessionStorage.setItem('amount', `${amount}`);
      sessionStorage.setItem('receipt', `${checkout.name}`);
    } else {
      alertError();
      return;
    }
    location.assign('/checkout');
  };
}
