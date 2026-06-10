// //importiing the module created
// const { default: mongoose } = require('mongoose');
// const User=require('../Models/user_model')
// const jwt = require("jsonwebtoken")
// const SECRECT_KEY="varshitha";

// const createuser=async(req,res)=>{
//     try{
//        const {name,email,password}=req.body

//        const user=new User({name,email,password})
//        //save the user data in module
//        await user.save();
//        res.status(201).json({message:'user created', user});
//     }catch(err){
//         res.status(500).json({message:'server error',err});
//     }
// }

// const getuser=async(req,res)=>{
//    try{
//      const user=await User.find();
//      res.status(200).json({user})
//    }catch(err){
//     res.status(500).json({message:"error fetching user", err});

//    }
// }

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



// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Find admin by email and password
//     const user = await User.findOne({ email: email, password: password });

//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" }); // **Fix: Use `return`**
//     }

//     // Generate token correctly with admin ID inside an object
//     const Token = jwt.sign({ id: user.id }, SECRECT_KEY);

//     return res.json({ success: true, message: "Login successfully", Token });

//   } catch (error) {
//     console.log("Login Error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// const getUserByEmail = async (req, res) => {
//   try {
//       const { email } = req.query;
//       console.log("Received email:", email);

//       const user = await User.findOne({ email });
//       console.log("User found:", user);

//       if (!user) {
//           return res.status(404).json({ success: false, message: "User not found" });
//       }

//       res.status(200).json({ success: true, user });
//   } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ success: false, message: "Server error", error });
//   }
// };


// module.exports={createuser,getuser,deleteuser,updateuser,getUserbyid,login, getUserByEmail};


const { default: mongoose } = require('mongoose');
const User = require('../Models/user_model');
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "varshitha";

// Create user
const createuser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email: email.trim(), password });
        await user.save();

        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
};

// Get all users
// const getuser = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json({ users });
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching users", err });
//     }
// };

const getuser = async (req, res) => {
    try {
        const users = await User.find();
        console.log("Users fetched from DB:", users); // Debugging log
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users", err });
    }
};


// Delete user by ID
const deleteuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error deleting user!' });
    }
};

// Update user
const updateuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.json({ success: true, message: "User updated!", user: updatedUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error updating user!' });
    }
};

// Get user by ID
const getUserbyid = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user", error });
        console.log(error);
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.trim(), password });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, SECRECT_KEY, { expiresIn: "1h" });

        return res.json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get user by email (case-insensitive)
// const getUserByEmail = async (req, res) => {
//     try {
//         const { email } = req.query;
//         const trimmedEmail = email.trim();
//         console.log("Received email:", trimmedEmail);

//         const user = await User.findOne({ email: { $regex: new RegExp(`^${trimmedEmail}$`, "i") } });
//         console.log("User found:", user);

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         res.status(200).json({ success: true, user });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ success: false, message: "Server error", error });
//     }
// };

const getUserByEmail = async (req, res) => {
  try {
      const { email } = req.query;
      console.log("Fetching user with email:", email);  // Debugging
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      console.log("User Found:", user); // Check if user is being retrieved
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};
module.exports = { 
    createuser, 
    getuser, 
    deleteuser, 
    updateuser, 
    getUserbyid, 
    login, 
    getUserByEmail 
};
