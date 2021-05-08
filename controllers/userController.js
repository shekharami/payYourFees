const Institute = require("../models/instituteModel");
const User = require("../models/userModel");


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


exports.saveInsitute = async (req, res, next) =>{
    try{
        const item = {... req.body};
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

exports.updateNote = async(req, res, next) => {
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

exports.deleteNote = async(req, res, next) =>{
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