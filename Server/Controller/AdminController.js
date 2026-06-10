//importiing the module created
const { default: mongoose } = require('mongoose');
const Admin=require('../Models/Admin_models')
const jwt = require("jsonwebtoken")
const SECRECT_KEY="admin";

const createadmin=async(req,res)=>{
    try{
       const {name,email,password}=req.body

       const admin=new Admin({name,email,password})
       //save the user data in module
       await admin.save();
       res.status(201).json({message:'admin created', admin});
    }catch(err){
        res.status(500).json({message:'server error',err});
    }
}

const getadmin=async(req,res)=>{
   try{
     const admin=await Admin.find();
     res.status(200).json({admin})
   }catch(err){
    res.status(500).json({message:"error fetching user", err});

   }
}

// const deleteuser=async(req,res)=>{
//   try {
//     //search by selected id
//     const user=await User.findById(req.params.id);
//     if (!user) {
//       res.json({success:false, message:"user not found!!"})
//     } else {
//       await User.findByIdAndDelete(req.params.id)
//       res.json({success:true, message:"user deleted!!"})
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({success:false , message:'error!!!!!' })
   
//   }
// }

// const updateuser= async(req,res)=>{
//   try {
//     const user= await User.findById(req.params.id)
//     if (!user) {
//       res.json({success:false, message:"user not found!!"})
//     } else {
//        user.name = req.body.name || user.name;
//        user.email = req.body.email || user.email;
//        user.password = req.body.password || user.password;

//        const updateduser = await user.save();
//        res.json({success:true, message:"user updated!!"  ,user:updateduser})
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({success:false , message:'error!!!!!' })
//   }
// }

// const getUserbyid=async(req,res)=>{
//   try { 
//     const {id} = req.params;//fetch id from url
//     if(!mongoose.Types.ObjectId.isValid(id)){ //check for valid id 
//       return res.status(404).json({success:false,message:"Invalid user ID format",});
//     }
//     const user = await User.findById(id);
//     if(!user){
//       return res.status(404).json({success:false,message:"user not found",});    
//     }
//     res.status(200).json({success:true,user});
//   } catch (error) {
//     res.status(500).json({success:false,message:"error fetching user",error});
//     console.log(error)
//   }
  
// }

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin by email and password
    const admin = await Admin.findOne({ email: email, password: password });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" }); // **Fix: Use `return`**
    }

    // Generate token correctly with admin ID inside an object
    const Token = jwt.sign({ id: admin.id }, SECRECT_KEY);

    return res.json({ success: true, message: "Login successfully", Token });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//module.exports={createuser,getuser,deleteuser,updateuser,getUserbyid,login};
module.exports={createadmin,getadmin,login};