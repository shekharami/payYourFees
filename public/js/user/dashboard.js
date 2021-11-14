import axios from 'axios';
import { months } from '../utils/staticData';

const addStudentImg = document.getElementById('addStudent-img');
if (addStudentImg) {
  addStudentImg.addEventListener('click', () => {
    location.assign('/link-student');
  });
}
if (document.location.pathname === '/dashboard') {
  window.onload = () => {
    document.getElementsByName('card').forEach((checkbox) => {
      checkbox.removeAttribute('checked');
    });
    let flag = 0;
    for (let i = 0; i < 5; i++) {
      if (!localStorage.getItem(`${i}`)) {
        flag = 1;
        localStorage.removeItem(`${i}`);
      }
    }
    document.getElementsByName('card').forEach((c) => {
      c.onchange = () => {
        if (c.parentElement.classList.length === 2) {
          c.parentElement.style.backgroundColor = '#f8f8ff';
          c.parentElement.classList.remove('selected');
        } else if (c.parentElement.classList.length === 1) {
          c.parentElement.classList.add('selected');
          c.parentElement.style.backgroundColor = 'lightgreen';
        }
      };
    });
  };
}

const checkout = [...document.getElementsByClassName('checkout')];
if (checkout.length) {
  //since there are two buttons for proceeding to payment page
  checkout.forEach((button) => {
    button.onclick = () => {
      const selectedStudents = [...document.getElementsByClassName('selected')];
      if (!selectedStudents.length) {
        alert('Please select at least one student!');
        return;
      }
      let i = 0;
      selectedStudents.forEach((s) => {
        const dataset = s.children;
        let nextPay = new Date(`02-${dataset[8].textContent.split(': ')[1]}`);
        let month = nextPay.getMonth() + 2;
        const year = nextPay.getFullYear();
        nextPay = new Date(`25-${months[`${month}`]}-${year}`);
        const studObj = {
          institute: dataset[3].id,
          class: dataset[1].textContent,
          nextPay,
          name: dataset[0].textContent
        };
        localStorage.setItem(`${i}`, JSON.stringify(studObj));
        i++;
      });
      location.assign('/checkout');
    };
  });
}

//add for payment
const addToCart = [...document.getElementsByName('add-to-cart')];
if (addToCart.length) {
  addToCart.forEach((button) => {
    button.onclick = async function () {
      try {
        // data variable is array of ovjects
        //  [{
        //   student : studentId,
        //   institute : array of institute ids,
        //   lastFeePriority : priority of last paid fee,
        //   fee : feeId
        // }]
        const selectedRows = [];
        [...document.getElementsByName(`${this.id}-select`)].forEach((instCheck) => {
          if (instCheck.checked) {
            selectedRows.push(instCheck.parentElement.parentElement);
          }
        });
        if (!selectedRows.length) {
          document.getElementById(`${this.id}-err`).innerText =
            'Please select at least 1 institute.';
          return;
        }
        const data = selectedRows.map((row) => {
          const institute = row.children[0].id;
          const lastFee = row.children[1].id || null;
          // lastFee = lastFee.split('-');
          return {
            student: this.id,
            institute,
            // lastFeePriority: lastFee[1] * 1,
            lastFee
          };
        });
        const res = await axios({
          method: 'POST',
          url: '/api/v1/student/add-to-cart',
          data,
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });
        if (res.data.status === 'success') {
          alert(res.data.data);
          location.reload(true);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
  });
}
