const express=require('express');
const {createuser,getuser, deleteuser,updateuser, getUserbyid, login, getUserByEmail}=require('../Controller/UserController');
const router=express.Router();

//define path or routes
router.post('/createuser', createuser)
router.get('/getuser', getuser)
router.delete('/deleteuser/:id', deleteuser)
router.put('/updateuser/:id', updateuser)
router.get('/getUserbyid/:id', getUserbyid)
router.post('/login', login)
router.get('/getUserByEmail', getUserByEmail)

module.exports=router;