



const express=require('express');
const {addbus, getBusDetails, getRoutes, deleteBus, updateBus, getBusById, getAmount } = require('../Controller/BusController');
const router=express.Router();

 

//define path or routes
router.post('/addbus', addbus)
router.get('/getRoute', getRoutes)
router.get('/getBusDetails',getBusDetails)
router.delete('/deletebus/:id', deleteBus);
router.put('/updateBus/:id', updateBus)
router.get('/getBusById/:id', getBusById)
router.get('/getAmount/:id', getAmount)


module.exports=router;