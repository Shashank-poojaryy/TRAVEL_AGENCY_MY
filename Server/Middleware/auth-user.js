//jwt is used for secure authenticarion
//and authoriztion
const jwt = require("jsonwebtoken")
const SECRECT_KEY="travel";
const authuser = async(req,res,next)=>{
    try {
        const userToken = await req.header("auth-token");
        if(userToken){
            const userdata = await jwt.verify(userToken,SECRECT_KEY);
            req.userId = userdata;
            next();
        }else{
            res.json({success:false,message:"Unathorized token"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Server errror"});
    }
}
module.exports = authuser;