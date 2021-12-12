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

const removeFromCart = [...document.getElementsByName('remove-from-cart')];
if (removeFromCart.length) {
  removeFromCart.forEach((removeIcon) => {
    removeIcon.onclick = async () => {
      const data = {
        institute: removeIcon.id || null,
        student: removeIcon.parentElement.id || null
      };
      if (!data.institute || !data.student) {
        alert('something went wrong!');
        return;
      }
      const res = await axios({
        method: 'DELETE',
        url: '/api/v1/student/remove-from-cart',
        data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (res.status === 204) {
        alert('Removed successfully');
        location.reload(true);
      }
    };
  });
}
