const Institute = require("../models/instituteModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const mongoose = require("mongoose");

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
        if(!res.locals.user) throw new Error('Please login to continue')
        
        let data;
        if(req.query.students){
            data = { students : req.body.students.map(id => mongoose.Types.ObjectId(id)) }
        }
        // const data = {
        //     name : req.body.name,
        //     email : req.body.email
        // }

        if(!data){
            throw new Error('Something went wrong')
        }

        const user = await User.findByIdAndUpdate(res.locals.user._id, data ,{new: true, runValidators: true})
        res.status(200).json({
            status: 'success',
            user
        })

        next();

    }catch(err){
        console.log(err)
        
        res.status(401).json({
            status:"fail",
            error: err.message
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

exports.taggedStudentDetails = async (req, res, next) => {
    try{

        const months = { 
            1 : 'JAN',
            2 : 'FEB',
            3 : 'Mar',
            4 : 'APR',
            5 : 'MAY',
            6 : 'JUN',
            7 : 'JUL',
            8 : 'AUG',
            9 : 'SEP',
            10: 'OCT',
            11: 'NOV',
            12: 'DEC'
        }
        if(!res.locals.user) return next()

        const taggedStudents = res.locals.user.students

        if(!taggedStudents.length) return next()

        const studentDetails = await Student.find({ _id : taggedStudents }).populate('institute').lean()

        let month, year;
        for(let i = 0; i< studentDetails.length; i++){
            delete studentDetails[i].addedAt
            delete studentDetails[i].__v
            month = studentDetails[i].feesPaidTill.getMonth() + 1
            year = studentDetails[i].feesPaidTill.getFullYear()
            res.locals.user.students[i] = studentDetails[i]
            res.locals.user.students[i].feesPaidTill = `${months[month]}-${year}`
        }

    }catch(err){

        console.log(err.stack)
    }
    next()
}