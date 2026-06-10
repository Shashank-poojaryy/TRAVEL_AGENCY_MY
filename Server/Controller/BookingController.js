// const { mongoose } = require("mongoose");
// const Booking = require("../Models/Booking_model"); // Import the Booking model

// // Add Booking
// // const addBooking = async (req, res) => {
// //     try {
// //         const { userid, busid, seatNumber, travelDate } = req.body;

// //         if (!userid || !busid || !seatNumber || !travelDate) {
// //             return res.status(400).json({ message: "All fields are required" });
// //         }

// //         const newBooking = new Booking({ userid, busid, seatNumber, travelDate, status: "Confirmed" });
// //         await newBooking.save();
// //         res.status(201).json({ message: "Booking successfully created", booking: newBooking });
// //     } catch (err) {
// //         res.status(500).json({ message: "Error creating booking", error: err.message });
// //     }
// // };

// const addBooking = async (req, res) => {
//     try {
//         console.log("Received Booking Request:", req.body); // Check what data is received

//         const { userid, busid, seatNumber, travelDate } = req.body;
//         if (!userid || !busid || !seatNumber || !travelDate) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const newBooking = new Booking({ userid, busid, seatNumber, travelDate, status: "Confirmed" });
//         await newBooking.save();

//         res.status(201).json({ message: "Booking successfully created", booking: newBooking });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating booking", error: err.message });
//     }
// };

// // Get All Bookings
// const getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find().populate("userid").populate("busid");
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching bookings", error: error.message });
//     }
// };

// // Get Booking by ID
// const getBookingById = async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id).populate("userid").populate("busid");
//         if (!booking) return res.status(404).json({ message: "Booking not found" });
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching booking details", error: error.message });
//     }
// };


// // Get Bookings for a Specific User
// const getBookingsByUserId = async (req, res) => {
//     try {
//         const { userid } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(userid)) {
//             return res.status(400).json({ message: "Invalid User ID format" });
//         }

//         const bookings = await Booking.find({ userid }).populate("userid").populate("busid");

//         if (!bookings.length) {
//             return res.status(404).json({ message: "No bookings found for this user" });
//         }

//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching bookings", error: error.message });
//     }
// };


// // Cancel Booking
// const cancelBooking = async (req, res) => {
//     try {
//         const booking = await Booking.findById(req.params.id);
//         if (!booking) return res.status(404).json({ message: "Booking not found" });

//         booking.status = "Cancelled";
//         await booking.save();
//         res.status(200).json({ message: "Booking cancelled successfully", booking });
//     } catch (error) {
//         res.status(500).json({ message: "Error cancelling booking", error: error.message });
//     }
// };

// module.exports = { addBooking, getBookings, getBookingById,  getBookingsByUserId, cancelBooking };


const { mongoose } = require("mongoose");
const Booking = require("../Models/Booking_model");
const Seat = require("../Models/Seat_model");
const nodemailer = require("nodemailer");

// ✅ Nodemailer Setup using values from .env
console.log("Starting Nodemailer with user:", process.env.EMAIL_USER);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send professional boarding pass HTML email
const sendBoardingPassEmail = async (bookingDetails) => {
  const { travellerName, travellerEmail, seatNumber, travelDate, boardingPoint, droppingPoint, busid } = bookingDetails;

  // Format the date for the email
  const formattedDate = new Date(travelDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const mailOptions = {
    from: `"Travel Agency" <${process.env.EMAIL_USER}>`,
    to: travellerEmail,
    subject: "✈️ Your Boarding Pass - BusBee",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; color: white; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">BOARDING PASS</h1>
          <p style="margin: 5px 0 0 opacity: 0.8;">Thank you for choosing BusBee</p>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px dashed #f1f5f9; padding-bottom: 20px;">
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 12px; margin: 0; text-transform: uppercase; font-weight: bold;">Passenger</p>
              <p style="color: #1e293b; font-size: 18px; margin: 5px 0; font-weight: bold;">${travellerName}</p>
            </div>
            <div style="flex: 1; text-align: right;">
              <p style="color: #64748b; font-size: 12px; margin: 0; text-transform: uppercase; font-weight: bold;">Seat No</p>
              <p style="color: #6366f1; font-size: 24px; margin: 5px 0; font-weight: 800;">${seatNumber}</p>
            </div>
          </div>

          <div style="display: flex; gap: 20px; margin-bottom: 25px;">
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 12px; margin: 0; text-transform: uppercase; font-weight: bold;">Date of Journey</p>
              <p style="color: #1e293b; font-size: 16px; margin: 5px 0; font-weight: 600;">${formattedDate}</p>
            </div>
            <div style="flex: 1;">
               <p style="color: #64748b; font-size: 12px; margin: 0; text-transform: uppercase; font-weight: bold;">Status</p>
               <p style="color: #10b981; font-size: 16px; margin: 5px 0; font-weight: 600;">CONFIRMED</p>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <div style="margin-bottom: 15px;">
              <p style="color: #6366f1; font-size: 11px; margin: 0; font-weight: bold; text-transform: uppercase;">Boarding From</p>
              <p style="color: #1e293b; font-size: 15px; margin: 5px 0; font-weight: bold;">${boardingPoint}</p>
            </div>
            <div>
              <p style="color: #e11d48; font-size: 11px; margin: 0; font-weight: bold; text-transform: uppercase;">Dropping At</p>
              <p style="color: #1e293b; font-size: 15px; margin: 5px 0; font-weight: bold;">${droppingPoint}</p>
            </div>
          </div>

          <div style="margin-top: 30px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px;">
            <p style="color: #94a3b8; font-size: 12px;">Please carry a copy of this boarding pass or show this email during check-in.</p>
            <p style="color: #6366f1; font-weight: bold; font-size: 14px; margin-top: 10px;">Safe Travels!</p>
          </div>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #64748b; font-size: 11px;">
          © 2026 Travel Agency. All rights reserved.
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Boarding pass successfully sent to ${travellerEmail}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

// ✅ Add Booking with Seat Status Update
// const addBooking = async (req, res) => {
//     try {
//         console.log("Received Booking Request:", req.body);

//         const { userid, busid, seatNumber, travelDate } = req.body;

//         if (!userid || !busid || !seatNumber || !travelDate) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Ensure travelDate is in the future
//         const today = new Date().setHours(0, 0, 0, 0);
//         if (new Date(travelDate).setHours(0, 0, 0, 0) < today) {
//             return res.status(400).json({ message: "Travel date must be in the future" });
//         }

//         // Check if seat is already booked
//         const existingBooking = await Booking.findOne({ busid, seatNumber, travelDate });
//         if (existingBooking) {
//             return res.status(409).json({ message: "Seat already booked for this date" });
//         }

//         // Create and save the new booking
//         const newBooking = new Booking({ userid, busid, seatNumber, travelDate, status: "Confirmed" });
//         await newBooking.save();

//         // ✅ Try updating the seat status to "Booked"
//         try {
//             const seat = await Seat.findOne({ bus: busid, seatNumber });
//             if (seat) {
//                 seat.status = "Booked"; 
//                 await seat.save();
//             }
//         } catch (seatError) {
//             console.error("Error updating seat status:", seatError.message);
//         }

//         res.status(201).json({ message: "Booking successfully created", booking: newBooking });
//     } catch (err) {
//         res.status(500).json({ message: "Error creating booking", error: err.message });
//     }
// };



const addBooking = async (req, res) => {
  console.log("🔥 NEW BOOKING REQUEST:", req.body);
  try {
    const {
      userid, busid, seatNumber, travelDate,
      travellerName, travellerAge, travellerGender, travellerEmail,
      boardingPoint, droppingPoint
    } = req.body;

    if (!userid || !busid || !seatNumber || !travelDate || !travellerName || !travellerAge || !travellerGender || !travellerEmail || !boardingPoint || !droppingPoint) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure travelDate is in the future
    const today = new Date().setHours(0, 0, 0, 0);
    if (new Date(travelDate).setHours(0, 0, 0, 0) < today) {
      return res.status(400).json({ message: "Travel date must be in the future" });
    }

    // Check if the seat is already booked
    const existingBooking = await Booking.findOne({ busid, seatNumber, travelDate });
    if (existingBooking) {
      return res.status(409).json({ message: "Seat already booked for this date" });
    }

    // Create and save the new booking
    const newBooking = new Booking({
      userid, busid, seatNumber, travelDate,
      travellerName, travellerAge, travellerGender, travellerEmail,
      boardingPoint, droppingPoint,
      status: "Confirmed"
    });
    await newBooking.save();

    // ✅ Attempt to send Boarding Pass Email (Asyncly)
    sendBoardingPassEmail(newBooking).catch(console.error);

    // ✅ Update seat status with the correct field (bus instead of busid)
    const seat = await Seat.findOne({ bus: busid, seatNumber });
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    seat.status = "Booked";
    await seat.save();

    res.status(201).json({ message: "Booking confirmed!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed. Try again later.", error: error.message });
  }
};



// ✅ Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userid").populate("busid");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// ✅ Get Booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Booking ID format" });
    }

    const booking = await Booking.findById(id).populate("userid").populate("busid");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details", error: error.message });
  }
};

// ✅ Get Bookings for a Specific User
const getBookingsByUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Fetch all bookings for the user
    const bookings = await Booking.find({ userid })
      .sort({ createdAt: -1 }) // Sort by date, newest first
      .populate("userid")
      .populate("busid");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest booking", error: error.message });
  }
};


// ✅ Cancel Booking with Seat Status Update
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Booking ID format" });
    }

    // ✅ Check if booking exists
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Prevent duplicate cancellation
    if (booking.status === "Cancelled") {
      return res.status(400).json({ success: false, message: "Booking is already cancelled" });
    }

    // ✅ Update booking status to "Cancelled"
    booking.status = "Cancelled";
    await booking.save();

    // ✅ Update seat status to "Available"
    const seat = await Seat.findOne({
      bus: booking.busid,
      seatNumber: Number(booking.seatNumber) // Ensure seatNumber is a Number
    });

    if (seat) {
      console.log("Seat found, updating status:", seat);
      seat.status = "Available";
      await seat.save();
      console.log("Seat updated successfully");
    } else {
      console.log("❌ Seat not found for bus:", booking.busid, "seatNumber:", booking.seatNumber);
    }

    // ✅ Fetch updated bookings after cancellation
    const updatedBookings = await Booking.find()
      .populate("userid")
      .populate("busid")
      .lean();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
      updatedBookings
    });

  } catch (error) {
    console.error("❌ Error cancelling booking:", error.message);
    res.status(500).json({ success: false, message: "Error cancelling booking", error: error.message });
  }
};




// ✅ Export all functions
module.exports = { addBooking, getBookings, getBookingById, getBookingsByUserId, cancelBooking };
