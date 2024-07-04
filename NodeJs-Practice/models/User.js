const mongoose = require('mongoose');
console.log("hello mongoose")
console.log(mongoose)
const {Schema} = mongoose

const UserSchema = new Schema({
    name:String
})