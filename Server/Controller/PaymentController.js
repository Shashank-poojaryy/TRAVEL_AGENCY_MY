// const Payment = require("../Models/Payment_model"); // Import the Payment model

// // Create a new payment
// // const createPayment = async (req, res) => {
// //   try {
// //     const { userid, booking, amount, paymentDate, status } = req.body;

// //     if (!userid || !booking || !amount) {
// //       return res.status(400).json({ message: "Missing required fields." });
// //     }

// //     const payment = new Payment({
// //       userid,
// //       booking,
// //       amount,
// //       paymentDate: paymentDate || new Date(),
// //       status: status || "Pending",
// //     });

// //     await payment.save();
// //     res.status(201).json({ message: "Payment created successfully!", payment });
// //   } catch (error) {
// //     console.error("Error creating payment:", error);
// //     res.status(500).json({ message: "Error creating payment", error: error.message });
// //   }
// // };


// const Booking = require("../Models/Booking_model");
// const User = require("../Models/user_model"); // Import User model

// // Create a new payment
// // const createPayment = async (req, res) => {
// //   try {
// //     const { userid } = req.body;

// //     if (!userid) {
// //       return res.status(400).json({ message: "User ID is required." });
// //     }

// //     // Check if user exists
// //     const userExists = await User.findById(userid);
// //     if (!userExists) {
// //       return res.status(404).json({ message: "User not found." });
// //     }

// //     // Fetch the latest booking for the user
// //     const latestBooking = await Booking.findOne({ userid }).sort({ bookingDate: -1 });

// //     if (!latestBooking) {
// //       return res.status(404).json({ message: "No booking found for the user." });
// //     }

// //     const { _id: bookingId, amount } = latestBooking;

// //     const payment = new Payment({
// //       userid,
// //       booking: bookingId,
// //       amount,
// //       paymentDate: new Date(),
// //       status: "Pending",
// //     });

// //     await payment.save();
// //     res.status(201).json({ message: "Payment created successfully!", payment });
// //   } catch (error) {
// //     console.error("Error creating payment:", error);
// //     res.status(500).json({ message: "Error creating payment", error: error.message });
// //   }
// // };

// // const createPayment = async (req, res) => {
// //   try {
// //     const { userid, busid } = req.body; // Ensure `busid` is received

// //     if (!userid || !busid) {
// //       return res.status(400).json({ message: "User ID and Bus ID are required." });
// //     }

// //     // Check if user exists
// //     const userExists = await User.findById(userid);
// //     if (!userExists) {
// //       return res.status(404).json({ message: "User not found." });
// //     }

// //     // Fetch the latest booking for the user
// //     const latestBooking = await Booking.findOne({ userid }).sort({ bookingDate: -1 });

// //     if (!latestBooking) {
// //       return res.status(404).json({ message: "No booking found for the user." });
// //     }

// //     const { _id: bookingId, amount } = latestBooking;

// //     const payment = new Payment({
// //       userid,
// //       busid, // Ensure busid is included
// //       booking: bookingId,
// //       amount,
// //       paymentDate: new Date(),
// //       status: "Pending",
// //     });

// //     await payment.save();
// //     res.status(201).json({ message: "Payment created successfully!", payment });
// //   } catch (error) {
// //     console.error("Error creating payment:", error);
// //     res.status(500).json({ message: "Error creating payment", error: error.message });
// //   }
// // };

// const createPayment = async (req, res) => {
//   try {
//     const { userid, busid } = req.body; // Ensure `busid` is received

//     if (!userid || !busid) {
//       return res.status(400).json({ message: "User ID and Bus ID are required." });
//     }

//     // Check if user exists
//     const userExists = await User.findById(userid);
//     if (!userExists) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Fetch the amount from the Bus table using busid
//     const busDetails = await Bus.findById(busid);
//     if (!busDetails) {
//       return res.status(404).json({ message: "Bus not found." });
//     }

//     const amount = busDetails.amount; // Get the amount from the Bus

//     // Fetch the latest booking for the user (optional, if needed)
//     const latestBooking = await Booking.findOne({ userid, busid }).sort({ bookingDate: -1 });

//     const payment = new Payment({
//       userid,
//       busid, // Ensure busid is included
//       booking: latestBooking ? latestBooking._id : null, // Link to booking if exists
//       amount, // Amount is now taken from the Bus table
//       paymentDate: new Date(),
//       status: "Pending",
//     });

//     await payment.save();
//     res.status(201).json({ message: "Payment created successfully!", payment });
//   } catch (error) {
//     console.error("Error creating payment:", error);
//     res.status(500).json({ message: "Error creating payment", error: error.message });
//   }
// };
// // Get all payments
// const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.status(200).json(payments);
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     res.status(500).json({ message: "Error fetching payments", error: error.message });
//   }
// };

// // Update payment
// const updatePayment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedPayment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     res.status(200).json({ message: "Payment updated successfully!", updatedPayment });
//   } catch (error) {
//     console.error("Error updating payment:", error);
//     res.status(500).json({ message: "Error updating payment", error: error.message });
//   }
// };



// module.exports = { createPayment, getAllPayments, updatePayment };


const Payment = require("../Models/Payment_model"); 
const Booking = require("../Models/Booking_model");
const User = require("../Models/user_model"); 
const Bus = require("../Models/Bus_model"); // Import Bus model

// Create a new payment
const createPayment = async (req, res) => {
  try {
    let { userid, busid } = req.body;

    if (!userid) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Check if user exists
    const userExists = await User.findById(userid);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch the latest booking only if booking ID wasn't provided directly
    let latestBooking = null;
    if (!req.body.booking) {
      latestBooking = await Booking.findOne({ userid }).sort({ bookingDate: -1 });
      if (!latestBooking) {
        return res.status(404).json({ message: "No booking found for this user." });
      }
    }

    // Determine final IDs (Prioritize body > latest booking)
    const finalBookingId = req.body.booking || (latestBooking ? latestBooking._id : null);
    const finalBusId = busid || (latestBooking ? latestBooking.busid : null);

    if (!finalBookingId || !finalBusId) {
      return res.status(400).json({ message: "Booking or Bus ID mismatch. Please try again." });
    }

    // Fetch bus details for the final bus ID to get the correct amount
    const busDetails = await Bus.findById(finalBusId);
    if (!busDetails) {
      return res.status(404).json({ message: "Selected Bus not found." });
    }

    const correctAmount = busDetails.amount;
    if (!correctAmount) {
      return res.status(400).json({ message: "Bus amount not found." });
    }

    // Create a new payment record with GUARANTEED correct IDs
    const payment = new Payment({
      userid,
      busid: finalBusId,
      booking: finalBookingId,
      amount: correctAmount,
      paymentDate: new Date(),
      status: "Completed", // Default to Confirmed (Completed) as requested
    });

    await payment.save();
    res.status(201).json({ message: "Payment created successfully!", payment });

  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};


// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment updated successfully!", updatedPayment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Error updating payment", error: error.message });
  }
};

module.exports = { createPayment, getAllPayments, updatePayment };
