const { default: mongoose } = require("mongoose");
const Seat = require("../Models/Seat_model");
const Bus = require("../Models/Bus_model");
const Booking = require("../Models/Booking_model"); // Import Booking model

// Get seats by busId
const getSeatsByBus = async (req, res) => {
  try {
    const { busId } = req.params;
    console.log("Received Bus ID:", busId); // Log to see the value

    // Validate busId
    if (!mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({ message: "Invalid Bus ID format" });
    }

    // Check if the busId exists in the Bus collection
    const busExists = await Bus.findById(busId);
    if (!busExists) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const seats = await Seat.find({ bus: busId });

    // Fetch bookings for this bus to find gender for booked seats
    const bookings = await Booking.find({ busid: busId });

    // Combine seat data with traveler gender from bookings
    const seatsWithGender = seats.map(seat => {
      const booking = bookings.find(b => b.seatNumber === seat.seatNumber && b.status !== "Cancelled");
      return {
        ...seat.toObject(),
        gender: booking ? booking.travellerGender : null
      };
    });

    if (seatsWithGender.length === 0) {
      return res.status(404).json({ message: "No seats found for this bus" });
    }

    res.json(seatsWithGender);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update seat status (for booking or cancellation)
const updateSeat = async (req, res) => {
  try {
    const { seatId } = req.params;
    const { status, busId, seatNumber } = req.body; // Expecting `busId` and `seatNumber` in request body

    // Validate seatId
    if (!mongoose.Types.ObjectId.isValid(seatId)) {
      return res.status(400).json({ message: "Invalid Seat ID format" });
    }

    // Validate busId if provided
    if (busId && !mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({ message: "Invalid Bus ID format" });
    }

    // Find the seat by ID and update status
    const updatedSeat = await Seat.findByIdAndUpdate(seatId, { status }, { new: true });

    if (!updatedSeat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    console.log(`Seat ${seatNumber} on Bus ${busId} updated to status: ${status}`);
    res.json({ message: "Seat status updated successfully", updatedSeat });
  } catch (error) {
    console.error("Error updating seat:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get available seats for a specific bus
const getAvailableSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(busId)) {
      return res.status(400).json({ message: "Invalid Bus ID format" });
    }

    // Find available seats
    const availableSeats = await Seat.find({ bus: busId, status: "Available" });

    // Fetch bookings for this bus to see if neighbors are booked (for frontend logic)
    const bookings = await Booking.find({ busid: busId, status: "Confirmed" });

    const availableWithContext = availableSeats.map(seat => {
      // Find neighbor/pair of this seat (handled in frontend too, but good to have)
      return {
        ...seat.toObject(),
        bookings: bookings.map(b => ({ seatNumber: b.seatNumber, gender: b.travellerGender }))
      };
    });

    res.json(availableWithContext);
  } catch (error) {
    console.error("Error fetching available seats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getSeatsByBus, updateSeat, getAvailableSeats };
