const mongoose=require('mongoose') //import mongoose

const adminSchema = new mongoose.Schema({ //create admin table
    email : {type:String, required:true},
    password : {type:String, required:true}

})
//exporting 
module.exports= mongoose.model('Admin', adminSchema)