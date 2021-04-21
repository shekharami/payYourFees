import axios from "axios";

export const signUp = async (data) => {

    try{
        const res = await axios({  
            method: 'POST',
            url: '/api/notes/user/signup',
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        if(res.data.status === 'success'){
            alert('Signed Up Successfully !')
            location.assign('/')
        }
    }catch(err){
        alert('Error :\n* password should be min 5 characters long *\nor\n*User with this email already exists!*')
    }
};

export const login = async (data) => {

    try{
        const res = await axios({  
            method: 'POST',
            url: '/api/notes/user/login',
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

        });

        if(res.data.status === 'success'){
            alert('Logged in succesfully!')
            location.assign('/')
        }
        
    }catch(err){
        alert('Wrong Email or Password !')
    }
};

export const logout = async () => {

    try{
        const res = await axios({  
            method: 'GET',
            url: '/api/notes/user/logout',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        
    }catch(err){
        alert(err.message)
    }
};




