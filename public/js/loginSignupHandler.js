import { signUp, login, logout } from './loginSignup';

const userSignup = document.getElementById('user-signup');
if (userSignup) {
  userSignup.addEventListener('click', async (e) => {
    e.preventDefault();

    userSignup.value = 'Please Wait !';

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone-number').value;
    const password = document.getElementById('user-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    // const institute = document.getElementById('institute').value
    const address = document.getElementById('address').value;
    // const address2 = document.getElementById('address2').value
    // const address3 = document.getElementById('address3').value
    // const city = document.getElementById('address-city').value
    const district = document.getElementById('address-district').value;
    const pincode = document.getElementById('pincode').value;
    const state = document.getElementById('address-state').value;

    if (!name) {
      alert('Please provide your name');
    } else if (!phone) {
      alert('Please provide your phone number');
    } else if (isNaN(phone * 1) || phone.length !== 10) {
      alert('Invalid phone number');
    } else if (!password) {
      alert('Please provide password');
    } else if (!confirmPassword) {
      alert('Please confirm your password');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (!address) {
      alert('please provide your address');
    } else if (!district) {
      alert('please provide your district');
    } else if (!pincode) {
      alert('please provide your pincode');
    } else if (isNaN(pincode * 1) || pincode.length !== 6) {
      alert('incorrect pincode');
    } else if (!state) {
      alert('please provide your state');
    } else {
      // server request
      const response = await signUp({
        type: 'user',
        name,
        email,
        phone,
        password,
        confirmPassword,
        // institute,
        address,
        district,
        pincode,
        state
      });

      if (response.data.status === 'success') {
        alert('Account created successfully!');
      }
      //after response is recieved set button text as before
      userSignup.value = 'Create an Account';
      // redirect to dasshboard
      location.reload(); // replace later
    }

    userSignup.value = 'Create an Account';
  });
}

const instituteSignup = document.getElementById('institute-signup');
if (instituteSignup) {
  instituteSignup.addEventListener('click', async (e) => {
    e.preventDefault();

    // instituteSignup.value = 'Please Wait !'

    let instituteType;
    document.getElementsByName('institute').forEach((p) => {
      if (p.checked) {
        instituteType = p.value;
      }
    });
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone-number').value;
    const alternatePhone = document.getElementById('alternate-phone-number').value;
    const password = document.getElementById('user-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const address = document.getElementById('address').value;
    const district = document.getElementById('address-district').value;
    const pincode = document.getElementById('pincode').value;
    const state = document.getElementById('address-state').value;

    if (!instituteType) {
      alert('Please select Institute Type');
    } else if (!name) {
      alert('Please provide your name');
    } else if (!email) {
      alert('Please provide your email');
    } else if (!phone) {
      alert('Please provide your phone number');
    } else if (isNaN(phone * 1) || phone.length !== 10) {
      alert('Invalid phone number');
    } else if (!password) {
      alert('Please provide password');
    } else if (!confirmPassword) {
      alert('Please confirm your password');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else if (!address) {
      alert('please provide your address');
    } else if (!district) {
      alert('please provide your district');
    } else if (!pincode) {
      alert('please provide your pincode');
    } else if (isNaN(pincode * 1) || pincode.length !== 6) {
      alert('incorrect pincode');
    } else if (!state) {
      alert('please provide your state');
    } else {
      const numbers = [phone];
      if (alternatePhone) {
        numbers.push(alternatePhone);
      }
      // server request
      const response = await signUp({
        type: 'institute',
        instituteType,
        name,
        email,
        phone: numbers,
        password,
        confirmPassword,
        address,
        district,
        pincode,
        state
      });

      console.log(response);
      if (response.data.status === 'success') {
        alert('Account created successfully!');
        location.assign('/institute/dashboard');
      }
    }
  });
}

const userLogin = document.getElementById('user-login');

if (userLogin) {
  userLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    let eorp = document.getElementById('email-or-mobile').value;
    const password = document.getElementById('user-password').value;
    let email = null,
      phone = null;

    if (!password || !eorp) {
      alert('Please provide email or phone and password !');
    } else {
      if (isNaN(eorp * 1) && eorp.includes('@')) {
        email = eorp;
      } else {
        if (eorp.length === 10 && !isNaN(eorp * 1)) {
          phone = eorp;
        } else {
          alert('Incorrect Email or phone');
          return;
        }
      }

      const authRes = await login({ email, phone, password, type: 'user' });
      if (authRes.data.status === 'success') {
        location.assign('/dashboard');
      }
    }
  });
}

const instituteLogin = document.getElementById('institute-login');

if (instituteLogin) {
  instituteLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('institute-id').value;
    const password = document.getElementById('institute-password').value;

    if (!password || !email) {
      alert('Please provide email and password !');
    } else {
      const authRes = await login({ email, password, type: 'institute' });

      if (authRes.data.status === 'success') {
        location.assign('/institute/dashboard');
      }
    }
  });
}
