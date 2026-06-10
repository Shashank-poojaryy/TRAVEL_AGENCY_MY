const express=require('express');
const { addBooking, getBookings, getBookingById, cancelBooking, getBookingsByUserId } = require('../Controller/BookingController');

const router=express.Router();

 

//define path or routes
router.post('/addBooking', addBooking)
router.get('/getBooking', getBookings)
router.get('/getBookingById/', getBookingById)
router.put('/cancelBooking/:id', cancelBooking)
router.get('/user/:userid', getBookingsByUserId)
// router.delete('/deleteroute/:id', deleteroute)
// router.put('/updateroute/:id', updateroute)
// router.get('/getRoutebyid/:id', getRoutebyid)

// router.post('/login', login)


module.exports=router;