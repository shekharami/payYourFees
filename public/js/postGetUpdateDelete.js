import axios from "axios";

export const postOrGet = async (data, type) => {

    //console.log(data)
    let url;

    try{
        type === 'posting'? url = '/api/notes/save' : url = '/api/notes/get';

        const res = await axios({  
            method: 'POST',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        

        if(res.data.status === 'success' && type ==='posting'){
            alert("Saved your item successfully.");
        }
        if(type ==='get_data'){
            return res.data.data ;
        }
        

    }catch(err){
        alert(err);
    }
};

export const updateNoteAxios = async (data) => {

    const url = '/api/notes/update';

    try{
        
        const res = await axios({  
            method: 'PATCH',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        
        if(res.data.status === 'success' ){
            return true
        }
        
    }catch(err){
        alert(err);
    }
};

export const deleteNote = async (id) => {
    try{
        const res = await axios({  
            method: 'DELETE',
            url: `/api/notes/delete/${id}`,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        if(res.status ===204){
            //alert("deleted note successfully.");
            location.reload(true)
        }

    }catch(err){
        alert(err);
    }
};


export const updateUser = async (data) => {

    const url = '/api/notes/user/updateUser';

    try{
        
        const res = await axios({  
            method: 'PATCH',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        
        const result = {
            name: res.data.user.name,
            email: res.data.user.email
        }

        return result
        
    }catch(err){
        alert('Error: \n1. User with this email already exists.\n2. Something went wrong from server side\nError code : 401');
    }
};


