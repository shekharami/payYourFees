const mongoose = require('mongoose')
const Institute = require('../models/instituteModel')
const Student = require('./../models/studentModel')
const User = require('./../models/userModel')
const Fees = require('./../models/feesModel')


exports.test = async (req, res, next) => {

    try{

        const names = ['amit','sumit','guddu','deepak',
        'mukesh','rajdev','mayank','ajay','rajeev',
        'brajesh','pranav','vikash','vivek'] //13
        

        const school = ["60acd2645b1c3916c4fdeea2","60ae12dfe0a6fb00159612de","60ae1344e0a6fb00159612df",
        "60ae13bbe0a6fb00159612e0","60ae1634e0a6fb00159612e1","60ae17c5e0a6fb00159612e2","60ae1847e0a6fb00159612e3",
        "60ae1909e0a6fb00159612e6","60ae1a92e0a6fb00159612e7","60ae1ad6e0a6fb00159612e9","60ae1b84e0a6fb00159612ea",
        "60ae1c38e0a6fb00159612ec","60ae1cdce0a6fb00159612ed"] //13

        const classes = ['I','II','III','IV','V','VI','VI','VII','VIII','IX','X','XI','XII']//12

        const section = ['A','B','C','D','E'] //5

        const month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

        const random = (arr, l)=>{
            return arr[Math.round(Math.random()*(l))]
        }
        /*
        //Add some students to table
        const students = []
        let t = 500;
        while(t--){
            const student = {
                name: random(names, 12),
                email: `user${t}@mail.com`,
                father : random(names,11),
                mother: random(names,11),
                institute: random(school, 4),
                rollNo: t+1,
                registrationNo: 'REG2021-'+ Math.round(Math.random()*1000) +t ,
                class: random(classes, 11),
                section: random(section, 4),
                feesPaidTill: new Date(`${random(month, 11)}-2021`)
            }

            let a = await Student.create(student)
            students.push(a)

        }
        */

        /*
        // Add som efees data to database
        const fees = []
        for(let i = 0 ; i< 12; i++){
            const o =  {
                institute : mongoose.Types.ObjectId('60acd2645b1c3916c4fdeea2'),
                name : `${month[i]}-2021`,
                desc : 'Description text',
                amount : 500,
                classes ,
                payBy :  ((i+1) === 12)? (new Date(`10-${month[0]}-2022`)) :new Date(`10-${month[i+1]}-2021`)
            }
            const fee = await Fees.create(o)
            fees.push(fee)
        }
        */

        console.log(req.body)

        res.status(200).json({
            status: 'success'//,
            // data : {
            //     length : fees.length,
            //     fees
            // }
        })

    }catch(err){
        res.status(200).json({
            status: 'fail',
            error : err.stack
        })
    }

    next()
}

exports.searchStudent = async (req, res, next) => {

    try{
        //implement refining the results using institute
        let query = Student.find( { institute: res.locals.institute._id });
        if(req.query.regno){
            query = query.find({ registrationNo: req.query.regno });
        }else if(req.query.class && req.query.section && req.query.name){
            query = query.find({  name: new RegExp(req.query.name), class : req.query.class , section : req.query.section });
        }else if(req.query.class && req.query.name){
            query = query.find({  name: new RegExp(req.query.name), class : req.query.class });
        }else if(req.query.class && req.query.section ){
            query = query.find({ class : req.query.class , section : req.query.section });
        }else if(req.query.class ){
            query = query.find({ class : req.query.class });
        }else if(req.query.name){
            query = query.find({ name: new RegExp(req.query.name) });
        }
        query = query.sort('name')
        const students = await query;
        
        res.status(200).json({
            status :'success',
            data : {
                length : students.length,
                students
            }
        })

    }catch(err){

        res.status(200).json({

            status :'fail',
            error: err.message
        })
    }

    next()
}

exports.getStudent = async (req, res, next) => {

    try{

        let query ;
        
        if(req.body.regNo){
            query = Student.find({ registrationNo: new RegExp(req.body.regNo) })
        }else if(req.body.name){
            query = Student.find({ name: new RegExp(req.body.name) })
        }else if(req.body.father){
            query = Student.find({ father: new RegExp(req.body.father) })
        }else if(req.body.mother){
            query = Student.find({ mother: new RegExp(req.body.mother) })
        }

        query = query.select('-__v -father -mother -email -addedAt')

        const students = await query;
        
        res.status(200).json({
            status :'success',
            data : students
        })

    }catch(err){

        res.status(200).json({

            status :'fail',
            error: err.message
        })
    }

    next()
}

exports.addStudent = async (req, res, next) => {

    try{

        const students = await User.updateOne({ _id: req.body.user }, 
            { $set : { students: req.body.students } },
            { new : true } )

        res.status(200).json({
            status :'success'
        })

    }catch(err){

        res.status(200).json({

            status :'fail',
            error: err.message
        })
    }

    next()
}

exports.getFeesDetails = async (req, res, next) => {
    try{

        if(!res.locals.user) throw new Error('Please login to continue !')

        let feesDetails = {}
        const names = []

        for ( o of req.body){
            names.push(o.name)
            feesDetails[o.name] =  { 
                institute : o.institute,
                details : await Fees.find( 
                        { 
                            institute : mongoose.Types.ObjectId(o.institute), 
                            payBy : { $gt : new Date(o.nextPay) },
                            classes : o.class.split(' ')[0],//{ $in : o.class.split(' ')[0] },
                            active : true
                        }
                    )
                    .sort('payBy')
                    .limit(2)
                    .select('-active -__v -addedAt -classes -programme -course -institute').lean()
                }
        }

        fesDetails = Object.keys(feesDetails)
        .map( name => {
                feesDetails[name].details = feesDetails[name].details
                .map(o => {
                    delete o.id
                    delete o._id
                    return o
                })
        })
        
        res.locals.feesDetails = feesDetails
        // console.log(feesDetails)
        // console.log(feesDetails['amit'].details)

        // res.status(200).json({ 
        //     status : 'success',
        //     data : feesDetails
        //  })

    }catch(err){
        console.log(err.stack)
        // res.status(200).json({
        //     status : 'fail',
        //     message : err.message
        // })
    }

    next()
}