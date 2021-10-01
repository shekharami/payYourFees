import axios from 'axios';

export const signUp = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/signup',
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    return res;
  } catch (err) {
    alert(
      'Error :\n* password should be min 5 characters long *\nor\n*User with this email already exists!*'
    );
  }
};

export const login = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/login',
      data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    return res;
  } catch (err) {
    alert('Wrong Email or Password !');
  }
};
