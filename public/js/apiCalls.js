import axios from "axios";

export const updateInstituteData = async (data) => {

    try{
        const res = await axios({  
            method: 'PATCH',
            url : '/api/v1/institute/update',
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        return res

    }catch(err){
        console.log(err)
    }
};