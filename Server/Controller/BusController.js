// // //importiing the module created
// // const {mongoose } = require('mongoose');
// // const Bus = require('../Models/Bus_model'); // Import the Bus model
// // const Route = require('../Models/busroute_model'); // Import the Bus model
// // const Seat = require('../Models/Seat_model'); // Import the Seat model

// // const addbus = async (req, res) => {
// //   try {
// //       const newBus = new Bus(req.body);
// //       const savedBus = await newBus.save();

// //       // 🔹 Create seats for the new bus
// //       let seats = [];
// //       for (let i = 1; i <= req.body.totalseats; i++) {
// //           seats.push({
// //               seatNumber: i,
// //               status: "Available",
// //               bus: savedBus._id // Linking seat to the bus
// //           });
// //       }

// //       await Seat.insertMany(seats); // Save seats to MongoDB

// //       res.status(201).json({ message: "Bus and seats added successfully", bus: savedBus });
// //   } catch (err) {
// //       res.status(500).json({ message: "Error creating bus", error: err });
// //   }
// // };


// //     const route =async(req,res)=>{
// //         try {
// //           const routes = await Route.find();
// //           res.status(200).json({ route: routes });
// //         } catch (error) {
// //           res.status(500).json({ message: 'Error fetching routes', error });
// //         }
// //       };

// // const getBusDetails = async (req, res) => {
// //   try {
// //     let { routeIds } = req.query;

// //     // Check if routeIds exists
// //     if (!routeIds) {
// //       return res.status(400).json({ error: "routeIds query parameter is required" });
// //     }

// //     // Ensure routeIds is always an array
// //     if (!Array.isArray(routeIds)) {
// //       routeIds = routeIds.split(",");
// //     }

// //     console.log("Received Route IDs:", routeIds); // Debugging log

// //     const buses = await Bus.find({ Routeid: { $in: routeIds } });

// //     console.log("Fetched Buses:", buses); // Debugging log

// //     res.json({ buses });
// //   } catch (error) {
// //     console.error("Error fetching bus details:", error);
// //     res.status(500).json({ error: "Error fetching bus details" });
// //   }
// // };

      
      
// // module.exports={addbus,route,getBusDetails};




// const mongoose = require('mongoose');
// const Bus = require('../Models/Bus_model');
// const Route = require('../Models/busroute_model');
// const Seat = require('../Models/Seat_model');

// // Add Bus with Seats
// // const addbus = async (req, res) => {
// //   try {
// //     const newBus = new Bus(req.body);
// //     const savedBus = await newBus.save();

// //     // Create seats for the new bus
// //     let seats = [];
// //     for (let i = 1; i <= req.body.totalseats; i++) {
// //       seats.push({
// //         seatNumber: i,
// //         status: "Available",
// //         bus: savedBus._id
// //       });
// //     }

// //     await Seat.insertMany(seats);

// //     res.status(201).json({ message: "Bus and seats added successfully", bus: savedBus });
// //   } catch (err) {
// //     res.status(500).json({ message: "Error creating bus", error: err });
// //   }
// // };

// const addbus = async (req, res) => {
//   try {
//     // Ensure the request contains bustime and Routeid
//     if (!req.body.bustime || !req.body.Routeid) {
//       return res.status(400).json({ message: "Bustime and Routeid are required" });
//     }

//     // Save the new bus entry
//     const newBus = new Bus(req.body);
//     const savedBus = await newBus.save();

//     // Find the latest bus bustime for this route
//     const latestBus = await Bus.findOne({ Routeid: savedBus.Routeid })
//       .sort({ bustime: -1 })  // Get the most recent bustime
//       .select("bustime");

//     console.log(`Latest bustime for Route ${savedBus.Routeid}: `, latestBus?.bustime);

//     if (latestBus) {
//       // Update the Route with the latest bustime
//       const updatedRoute = await Route.findByIdAndUpdate(
//         savedBus.Routeid,
//         { $set: { date: latestBus.bustime } }, // Adding date field to Route
//         { new: true, upsert: true }
//       );

//       console.log("Updated Route with date: ", updatedRoute);
//     }

//     res.status(201).json({ message: "Bus added successfully", bus: savedBus });

//   } catch (err) {
//     console.error("Error adding bus:", err);
//     res.status(500).json({ message: "Error creating bus", error: err });
//   }
// };





// // Get Bus Details Based on Route IDs
// const getBusDetails = async (req, res) => {
//     const { routeIds } = req.query;

//     try {
//         let buses;
//         if (routeIds) {
//             buses = await Bus.find({ Routeid: routeIds });
//         } else {
//             buses = await Bus.find(); // Return all buses if no routeIds is provided
//         }
//         res.json(buses);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// }

// // Get All Routes
// const getRoutes = async (req, res) => {
//   try {
//     const routes = await Route.find();
//     res.status(200).json({ routes });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching routes", error });
//   }
// };

// // Delete Bus
// const deleteBus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBus = await Bus.findByIdAndDelete(id);

//     if (!deletedBus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     await Seat.deleteMany({ bus: id });

//     res.status(200).json({ success: true, message: "Bus deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting bus", error });
//   }
// };

// const updateBus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Find the existing bus
//     const existingBus = await Bus.findById(id);
//     if (!existingBus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     // Update bus details
//     const updatedBus = await Bus.findByIdAndUpdate(id, updatedData, { new: true });

//     // Handle seat updates if totalseats changes
//     if (updatedData.totalseats && updatedData.totalseats !== existingBus.totalseats) {
//       // Delete old seats
//       await Seat.deleteMany({ bus: id });

//       // Create new seats based on updated total
//       let seats = [];
//       for (let i = 1; i <= updatedData.totalseats; i++) {
//         seats.push({
//           seatNumber: i,
//           status: "Available",
//           bus: id
//         });
//       }
//       await Seat.insertMany(seats);
//     }

//     res.status(200).json({ success: true, message: "Bus updated successfully!", bus: updatedBus });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating bus", error });
//   }
// };

// const getBusById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const bus = await Bus.findById(id);

//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     res.status(200).json({ success: true, bus });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bus details", error });
//   }
// };

// module.exports = { addbus, getBusDetails, getRoutes, deleteBus, updateBus, getBusById };





// const mongoose = require('mongoose');
// const Bus = require('../Models/Bus_model');
// const Route = require('../Models/busroute_model');
// const Seat = require('../Models/Seat_model');

// // Add Bus with Seats
// const addbus = async (req, res) => {
//   try {
//     const { bustime, Routeid, totalseats } = req.body;

//     // Ensure required fields are provided
//     if (!bustime || !Routeid || !totalseats) {
//       return res.status(400).json({ message: "Bustime, Routeid, and totalseats are required" });
//     }

//     // Check if bustime is a valid date
//     if (isNaN(new Date(bustime))) {
//       return res.status(400).json({ message: "Invalid bustime format" });
//     }

//     // Save the new bus entry
//     const newBus = new Bus(req.body);
//     const savedBus = await newBus.save();

//     // Find the latest bus bustime for this route
//     const latestBus = await Bus.findOne({ Routeid: savedBus.Routeid })
//       .sort({ bustime: -1 })  // Get the most recent bustime
//       .select("bustime");

//     if (latestBus) {
//       // Update the Route with the latest bustime
//       const updatedRoute = await Route.findByIdAndUpdate(
//         savedBus.Routeid,
//         { $set: { date: latestBus.bustime } }, // Adding date field to Route
//         { new: true, upsert: true }
//       );

//       console.log("Updated Route with date: ", updatedRoute);
//     }

//     // Create seats for the new bus
//     let seats = [];
//     for (let i = 1; i <= totalseats; i++) {
//       seats.push({
//         seatNumber: i,
//         status: "Available",
//         bus: savedBus._id
//       });
//     }

//     await Seat.insertMany(seats); // Save seats to MongoDB

//     res.status(201).json({ message: "Bus and seats added successfully", bus: savedBus });
//   } catch (err) {
//     console.error("Error adding bus:", err);
//     res.status(500).json({ message: "Error creating bus", error: err });
//   }
// };

// // Get Bus Details Based on Route IDs
// const getBusDetails = async (req, res) => {
//   const { routeIds } = req.query;

//   try {
//     let buses;
//     if (routeIds) {
//       buses = await Bus.find({ Routeid: { $in: routeIds } }); // Search buses by multiple route IDs
//     } else {
//       buses = await Bus.find(); // Return all buses if no routeIds is provided
//     }
//     res.json(buses);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// }

// // Get All Routes
// const getRoutes = async (req, res) => {
//   try {
//     const routes = await Route.find();
//     res.status(200).json({ routes });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching routes", error });
//   }
// };

// // Delete Bus
// const deleteBus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBus = await Bus.findByIdAndDelete(id);

//     if (!deletedBus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     await Seat.deleteMany({ bus: id }); // Delete associated seats

//     res.status(200).json({ success: true, message: "Bus deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting bus", error });
//   }
// };

// const updateBus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Find the existing bus
//     const existingBus = await Bus.findById(id);
//     if (!existingBus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     // Update bus details
//     const updatedBus = await Bus.findByIdAndUpdate(id, updatedData, { new: true });

//     // Handle seat updates if totalseats changes
//     if (updatedData.totalseats && updatedData.totalseats !== existingBus.totalseats) {
//       // Delete old seats
//       await Seat.deleteMany({ bus: id });

//       // Create new seats based on updated total
//       let seats = [];
//       for (let i = 1; i <= updatedData.totalseats; i++) {
//         seats.push({
//           seatNumber: i,
//           status: "Available",
//           bus: id
//         });
//       }
//       await Seat.insertMany(seats); // Save new seats to MongoDB
//     }

//     res.status(200).json({ success: true, message: "Bus updated successfully!", bus: updatedBus });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating bus", error });
//   }
// };

// const getBusById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const bus = await Bus.findById(id);

//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     res.status(200).json({ success: true, bus });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching bus details", error });
//   }
// };

// module.exports = { addbus, getBusDetails, getRoutes, deleteBus, updateBus, getBusById };

const mongoose = require('mongoose');
const Bus = require('../Models/Bus_model');
const Route = require('../Models/busroute_model');
const Seat = require('../Models/Seat_model');

// Add Bus with Seats
const addbus = async (req, res) => {
  try {
    const { bustime, Routeid, totalseats } = req.body;

    // Ensure required fields are provided
    if (!bustime || !Routeid || !totalseats) {
      return res.status(400).json({ message: "Bustime, Routeid, and totalseats are required" });
    }

    // Check if bustime is a valid date
    if (isNaN(new Date(bustime))) {
      return res.status(400).json({ message: "Invalid bustime format" });
    }

    // Save the new bus entry
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();

    // Find the latest bus bustime for this route
    const latestBus = await Bus.findOne({ Routeid: savedBus.Routeid })
      .sort({ bustime: -1 })  // Get the most recent bustime
      .select("bustime");

    console.log("Latest Bus Bustime:", latestBus?.bustime);

    if (latestBus && latestBus.bustime) {
      // Update the Route with the latest bustime
      await Route.findByIdAndUpdate(
        savedBus.Routeid,
        { $set: { date: latestBus.bustime } }, // Adding date field to Route
        { new: true, upsert: true }
      );
    } else {
      // If no previous bus exists, use the newly added bus's bustime
      await Route.findByIdAndUpdate(
        savedBus.Routeid,
        { $set: { date: savedBus.bustime } },
        { new: true, upsert: true }
      );
    }

    console.log("Updated Route with new date");

    // Create seats for the new bus
    let seats = [];
    for (let i = 1; i <= totalseats; i++) {
      seats.push({
        seatNumber: i,
        status: "Available",
        bus: savedBus._id
      });
    }

    await Seat.insertMany(seats); // Save seats to MongoDB

    res.status(201).json({ message: "Bus and seats added successfully", bus: savedBus });
  } catch (err) {
    console.error("Error adding bus:", err);
    res.status(500).json({ message: "Error creating bus", error: err });
  }
};

// Get Bus Details Based on Route IDs
const getBusDetails = async (req, res) => {
  try {
    const { routeIds } = req.query;
    console.log("Fetching buses for routes:", routeIds);

    let buses;
    if (routeIds) {
      buses = await Bus.find({ Routeid: { $in: routeIds } }).populate("Routeid");
    } else {
      buses = await Bus.find().populate("Routeid");
    }

    console.log("Buses found:", buses);
    res.json(buses);
  } catch (error) {
    console.error("Error fetching bus details:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Routes
const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({}, 'date name'); // Explicitly fetch 'date' and 'name'
    console.log("Routes fetched:", routes);
    res.status(200).json({ routes });
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ message: "Error fetching routes", error });
  }
};

// Delete Bus
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);

    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await Seat.deleteMany({ bus: id }); // Delete associated seats

    res.status(200).json({ success: true, message: "Bus deleted successfully!" });
  } catch (error) {
    console.error("Error deleting bus:", error);
    res.status(500).json({ message: "Error deleting bus", error });
  }
};

// Update Bus
const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Find the existing bus
    const existingBus = await Bus.findById(id);
    if (!existingBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Update bus details
    const updatedBus = await Bus.findByIdAndUpdate(id, updatedData, { new: true });

    // Handle seat updates if totalseats changes
    if (updatedData.totalseats && updatedData.totalseats !== existingBus.totalseats) {
      await Seat.deleteMany({ bus: id });

      let seats = [];
      for (let i = 1; i <= updatedData.totalseats; i++) {
        seats.push({
          seatNumber: i,
          status: "Available",
          bus: id
        });
      }
      await Seat.insertMany(seats);
    }

    // Check if bustime changed and update Route's date
    if (updatedData.bustime && updatedData.bustime !== existingBus.bustime) {
      const latestBus = await Bus.findOne({ Routeid: existingBus.Routeid })
        .sort({ bustime: -1 })  // Get the most recent bustime
        .select("bustime");

      await Route.findByIdAndUpdate(
        existingBus.Routeid,
        { $set: { date: latestBus ? latestBus.bustime : updatedData.bustime } },
        { new: true, upsert: true }
      );

      console.log("Updated Route with new date after bus update");
    }

    res.status(200).json({ success: true, message: "Bus updated successfully!", bus: updatedBus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: "Error updating bus", error });
  }
};

// Get Bus by ID
const getBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id).populate("Routeid");

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ success: true, bus });
  } catch (error) {
    console.error("Error fetching bus details:", error);
    res.status(500).json({ message: "Error fetching bus details", error });
  }
};

// const getAmount = async (req, res) => {
//   try {
//     let { busid } = req.params;
//     busid = busid.trim(); // Remove any unwanted spaces or newlines

//     console.log("Sanitized Bus ID:", busid);

//     // Validate ObjectId format
//     if (!/^[a-fA-F0-9]{24}$/.test(busid)) {
//       return res.status(400).json({ message: "Invalid Bus ID format" });
//     }

//     const bus = await Bus.findById(busid);
//     if (!bus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }

//     res.json({ amount: bus.amount });
//   } catch (error) {
//     console.error("Error fetching bus amount:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

const getAmount = async (req, res) => {
  try {
    const { id } = req.params; // Make sure you're using "id", not "busId"
    
    console.log("Received Bus ID:", id); // Debugging output

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Bus ID format" });
    }

    const bus = await Bus.findById(id); // Query using _id

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ amount: bus.amount });
  } catch (error) {
    console.error("Error fetching bus amount:", error);
    res.status(500).json({ message: "Failed to fetch bus amount", error });
  }
};






module.exports = { addbus, getBusDetails, getRoutes, deleteBus, updateBus, getBusById, getAmount };
