const Institute = require("../models/instituteModel");

exports.getNoteforTemplate = async (req, res, next) =>{

    try{
        user = res.locals.user
        if(user){
            const data = await Institute.find({email: user.email}).sort({ createdAt:  -1 });
            res.locals.data = data
        }

    }catch(err){
        console.log(err);
    }
    
    next();
};

exports.getInstituteDetails = async (req, res, next) =>{

    try{
        const user = res.locals.user
        if(user){
            const data = await Institute.findById({ _id: req.params.instituteId })
            res.locals.data = data
            return next();
            
        }else{
            const data = await Institute.findById({ _id: req.params.instituteId })
            res.status(200).json({
                status: "success",
                data
            });

        }

    }catch(err){
        console.log(err);
    }
    
    next();
};

exports.saveInsitute = async (req, res, next) =>{
    try{
        const item = {
            instituteType: req.body.instituteType,
            name: req.body.name,
            email: req.body.email ,
            phone: req.body.phone,
            addressLine1: req.body.address1,
            addressLine2: req.body.address2,
            addressLine3: req.body.address3,
            addressCity: req.body.city,
            addressDistrict: req.body.district,
            addressPinCode: req.body.pincode,
            addressState: req.body.state
        };
        const data = await Institute.create(item);

        res.status(201).json({
            status: "success",
            data: {
                data
            }

        });
    
    }catch(err){
        console.log(err);
    }

    next();
};

exports.updateInstituteData = async(req, res, next) => {
    try{
        
        //const note = await Institute.findOneAndUpdate({_id: req.body.id},{$set:{item: req.body.item}, createdAt: Date.now()},{new:true});
        const note = await Institute.findByIdAndUpdate({_id: req.body.id},{$set:{item: req.body.item}, createdAt: Date.now()},{new:true});

        res.status(200).json({
            status: "success",
            data: {
                note
            }
        });
    

    }catch(err){
        console.log(err)
    }

    next();
}

exports.deleteInstitute = async(req, res, next) =>{
    //change this to work as the world works, set delete flag to true
    try{

        await Institute.findOneAndDelete({_id: req.params.id});

        res.status(204).json({
            status: "success",
            data: null
        });

    }catch(err){
        console.log(err);
    }

    next();

};