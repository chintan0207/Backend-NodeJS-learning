const mongoose = require('mongoose')

const FormDataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    hobbies:{
        type:[String],
        required:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
    },
    agreeTerms:{
        type:Boolean,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }

})

const FormData = mongoose.model('FormData',FormDataSchema)
module.exports = FormData