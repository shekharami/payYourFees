const Institute = require("../models/instituteModel");

exports.getInstitutes = async (req, res, next) =>{

    try{
        
        const institutes = await Institute.find().select('name')//.sort({name: -1 })
        
        res.locals.institutes = institutes.map(i => {
            return { name: i.name, id : i._id }
        })

    }catch(err){

        // res.locals.institutes = ['Error fetching institute names']
    }
    
    next();
};

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