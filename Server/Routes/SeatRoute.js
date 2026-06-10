const express = require("express");
const router = express.Router();
const {  getSeatsByBus, updateSeat, getAvailableSeats } = require("../Controller/SeatController");

// router.post("/addSeats", addSeatsToBus); // Add seats when a bus is created
router.get("/getSeats/:busId", getSeatsByBus); // Get seats by busId
router.put("/updateSeat/:seatId", updateSeat); // Book/cancel a seat
router.put("/availableSeats/:seatId", getAvailableSeats);
module.exports = router;
