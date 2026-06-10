const express = require('express');
const { 
    createroute, 
    getroute, 
    deleteroute, 
    updateroute, 
    getRoutebyid, 
    getBusRoute, 
    updateBoardingPoints, 
    deleteBoardingPoint 
} = require('../Controller/Busroute_controller');
const router = express.Router();

// Define route paths
router.post('/createroute', createroute);
router.get('/getroute', getroute);
router.get('/getBusRoute', getBusRoute);
router.get('/getRoutebyid/:id', getRoutebyid);
router.put('/updateroute/:id', updateroute);
router.delete('/deleteroute/:id', deleteroute);

// Boarding point specific routes
router.put('/:id/boarding-points', updateBoardingPoints);
router.delete('/:routeId/boarding-point/:pointId', deleteBoardingPoint);

module.exports = router;