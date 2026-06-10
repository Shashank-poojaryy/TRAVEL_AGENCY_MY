const mongoose=require('mongoose') //import mongoose

const busSchema = new mongoose.Schema({ //create user table
    busname : {type:String, required:true},
    // busroute : {type:String, required:true},
    busnumber : {type:String, required:true},
    busaddress : {type:String, required:true},
    bustime : {type:Date, required:true},
    totalseats: {type:Number, require:true},
    amount:{type:String, require:true},
    bustype: { type: String, enum: ["AC", "Non-AC"], default: "Non-AC" },
    Routeid: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: false },
       

})
//exporting 
module.exports= mongoose.model('Bus', busSchema)