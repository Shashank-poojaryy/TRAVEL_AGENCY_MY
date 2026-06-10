const express=require('express');

const { createadmin, getadmin, login } = require('../Controller/AdminController');

const router=express.Router();

router.post('/createadmin', createadmin)
router.get('/getadmin', getadmin)
router.post('/login', login)
module.exports=router;