const mongoose=require('mongoose')
const URI="mongodb://localhost:27017/travel"

const dbConnections=async ()=>{
    try{
await mongoose.connect(URI)
console.log("Database Connected!")
    }catch(err){
        console.log(err)

    }
}
module.exports=dbConnections;