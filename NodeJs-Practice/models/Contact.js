const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    Date:{
        type:Date,
        default:Date.now
    }

})

const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact