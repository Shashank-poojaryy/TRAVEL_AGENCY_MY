//jwt is used for secure authenticarion
//and authoriztion
const jwt = require("jsonwebtoken")
const SECRECT_KEY="admin";
const auth_admin = async(req,res,next)=>{
    try {
        const adminToken = await req.header("auth-token");
        if(adminToken){
            const admindata = await jwt.verify(adminToken,SECRECT_KEY);
            req.adminId = admindata;
            next();
        }else{
            res.json({success:false,message:"Unathorized token"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Server errror"});
    }
}
module.exports = auth_admin;
