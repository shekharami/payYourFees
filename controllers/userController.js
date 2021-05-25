const Institute = require("../models/instituteModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");

exports.getUser = async (req, res, next) =>{

    try{
        user = res.locals.user
        if(user){
            const data = await Institute.find({email: user.email}).sort({ createdAt:  -1 });
            res.locals.data = data
            return next();
        }else{
            const data = await Institute.find({email: req.body.email}).sort({ createdAt:  -1 });
        
            res.status(200).json({
                status: "success",
                data:{
                    length: data.length,
                    data
                }
            });

        }
    }catch(err){
        console.log(err);
    }
    
    next();
};


// exports.saveInsitute = async (req, res, next) =>{
//     try{
//         const item = {... req.body};
//         const data = await Institute.create(item);

//         res.status(201).json({
//             status: "success",
//             data: {
//                 data
//             }

//         });
    
//     }catch(err){
//         console.log(err);
//     }

//     next();
// };

exports.updateUser = async (req, res, next) => {
    try{

        const data = {
            name : req.body.name,
            email : req.body.email
        }

        if(!data){
            throw new Error('Something went wrong')
        }

        const user = await User.findByIdAndUpdate(req.body.id, data ,{new: true, runValidators: true})

        res.status(201).json({
            status: 'success',
            user
        })

        next();

    }catch(err){
        console.log(err)
        
        res.status(401).json({
            status:"fail",
            error: err.stack
        })
    }
    
};

exports.addStudent = async (req, res, next) => {

    try{

        // findstudentfrom database
    }catch(err){

        res.status(200).json({
            status: 'fail',
            error: err.message
        })
    }
    next()
}