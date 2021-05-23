const Student = require('./../models/studentModel')
const User = require('./../models/userModel')


exports.test = async (req, res, next) => {

    try{
        /*
        const names = ['amit','sumit','guddu','deepak',
        'mukesh','rajdev','mayank','ajay','rajeev',
        'brajesh','pranav','vikash','vivek'] //13
        

        const school = ['6096c3c605d05a0015fba2ed','6096c49a0710ac0015c2574b', 
        '60974b31b4ffd3001503d33e','6097b3ca266dcb0015cdf652'] //4

        const classes = ['I','II','III','IV','V','VI','VI','VII','VIII','IX','X','XI','XII']//12

        const section = ['A','B','C','D','E'] //5

        const month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

        const random = (arr, l)=>{
            return arr[Math.round(Math.random()*(l))]
        }
        const students = []
        let t = 100;
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
        res.status(200).json({
            status: 'success'//,
            // data: students
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
        let query = Student.find(/* { institute: res.locals.institute }*/);


        if(req.query.regno){
            query = query.find({ registrationNo: req.query.regno });
        }else if(req.query.class && req.query.section && req.query.name){
            query = query.find({  name:new RegExp(req.query.name), class : req.query.class , section : req.query.section });
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
        
        if(req.body.father){
            query = Student.find({ father: req.body.father })
        }else if(req.body.mother){
            query = Student.find({ mother: req.body.mother })
        }else if(req.body.regNo){
            query = Student.find({ registrationNo: req.body.regNo })
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