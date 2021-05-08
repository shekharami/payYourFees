import axios from "axios";

export const signUp = async (type, data) => {

    try{

        let url
        (type === 'user') ? url = '/api/v1/user/signup' 
        : url = '/api/v1/institute/signup'
        
        const res = await axios({  
            method: 'POST',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        return res
        // if(res.data.status === 'success'){
        //     alert('Signed Up Successfully !')
        //     location.assign('/')
        // }
    }catch(err){
        alert('Error :\n* password should be min 5 characters long *\nor\n*User with this email already exists!*')
    }
};

export const login = async (data) => {

    try{

        let url = '/api/v1/user/login'
        // (data.type === 'user') ? url += 'user/login' : url += 'instute/login' 
        //currently both user & intitute are usinbg same login endpoint

        const res = await axios({  
            method: 'POST',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

        });

        return res
        
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




