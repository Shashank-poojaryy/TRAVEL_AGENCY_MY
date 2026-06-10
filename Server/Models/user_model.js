const mongoose=require('mongoose') //import mongoose

const userSchema = new mongoose.Schema({ //create user table
    name : {type:String, required:true},
    email : {type:String, required:true},
    password : {type:String, required:true}

})
//exporting 
module.exports= mongoose.model('User', userSchema)