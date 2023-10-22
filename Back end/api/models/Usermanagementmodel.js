// This code is an adpatation of code provided in the gitrepo: https://github.com/CodeWithHarry/iNotebook-React/blob/master/backend/models/User.js provided by codewitharry
const mongoose=require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        required: true,
    }
  

})

module.exports= mongoose.model("User",userschema)
