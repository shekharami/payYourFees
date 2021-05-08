const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Institute = require('./instituteModel');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'You should provide your name']
    },

    email: {
        type: String, 
        // required: [true,'You must provide your name'],
        unique: true
        // lowerCase: true
    },

    phone: {
        type: String,
        unique: true
    },

    addressLine1:{
        type: String
    },

    addressLine2:{
        type: String
    },

    addressLine3:{
        type: String
    },

    addressCity:{
        type: String
    },

    addressDistrict:{
        type: String
    },

    addressPincode:{
        type: Number
    },

    addressState:{
        type: String
    },

    // institute: {
    //     type: mongoose.Types.ObjectId,
    //     ref: Institute,
        
    // },

    password: {
        type: String,
        required:  [true,'Please enter a password'],
        minlength: 5,
        select: false
    },
    confirmPassword: {
        type: String,
        required:  [true,'Please confirm your password'],
        validate:{
            //This only works on CREATE OR SAVE!
            validator: function(val){
                return val === this.password;
            }
        },
        message: 'You typed something different than above.'
    },

    ceatedAt: {
        type: Date,
        default: Date.now()
    }


}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    this.confirmPassword = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
};

const User = mongoose.model('User', userSchema)

module.exports = User;