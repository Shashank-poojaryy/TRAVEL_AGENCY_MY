//importiing the module created
const { default: mongoose } = require('mongoose');
const Route=require('../Models/busroute_model')
const Bus = require("../Models/Bus_model");  // Import Bus model

// const jwt = require("jsonwebtoken")
// const SECRECT_KEY="varshitha";

// const createroute=async(req,res)=>{
//     try{
//        const {startpoint, endpoint, distance, duration}=req.body

//        const route=new Route({startpoint, endpoint, distance, duration})
//        //save the user data in module
//        await route.save();
//        res.status(201).json({message:'route created', route});
//     }catch(err){
//         res.status(500).json({message:'server error',err});
//     }
// }

// const createroute = async (req, res) => {
//   try {
//       const { startpoint, endpoint, distance, duration, busid } = req.body;

//       let date = null;

//       // Check if busid is provided and fetch the associated bus date
//       if (busid) {
//           const bus = await Bus.findById(busid);
//           if (bus) {
//               date = bus.bustime; // Assign the bus's date to the route
//           }
//       }

//       // Create a new Route with the assigned date
//       const route = new Route({ startpoint, endpoint, distance, duration, busid, date });

//       // Save the route in the database
//       await route.save();
//       res.status(201).json({ message: "Route created", route });
//   } catch (err) {
//       res.status(500).json({ message: "Server error", err });
//   }
// };
const createroute = async (req, res) => {
  try {
      const { routeName, sourceCity, destinationCity, estimatedTime, distance, busid, boardingPoints, droppingPoints } = req.body;
      let date = null;

      // If a bus ID is provided, fetch the bus and assign its date
      if (busid) {
          const bus = await Bus.findById(busid);
          if (bus) {
              date = bus.bustime; // Assign the bus's date to the route
          }
      }

      // Create the route with the retrieved date and new fields
      const route = new Route({ 
          routeName, 
          sourceCity, 
          destinationCity, 
          estimatedTime, 
          distance, 
          busid, 
          date,
          boardingPoints: boardingPoints || [],
          droppingPoints: droppingPoints || []
      });

      await route.save();
      res.status(201).json({ message: "Route created successfully", route });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", err });
  }
};




const getroute=async(req,res)=>{
   try{
     const route=await Route.find();
     res.status(200).json({route})
   }catch(err){
    res.status(500).json({message:"error fetching user", err});

   }
}

const deleteroute=async(req,res)=>{
  try {
    //search by selected id
    const route=await Route.findById(req.params.id);
    if (!route) {
      res.json({success:false, message:"route not found!!"})
    } else {
      await Route.findByIdAndDelete(req.params.id)
      res.json({success:true, message:"route deleted!!"})
    }

  } catch (error) {
    console.log(error);
    res.json({success:false , message:'error!!!!!' })
   
  }
}

const updateroute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.json({ success: false, message: "route not found!!" });
    } else {
      route.routeName = req.body.routeName || route.routeName;
      route.sourceCity = req.body.sourceCity || route.sourceCity;
      route.destinationCity = req.body.destinationCity || route.destinationCity;
      route.distance = req.body.distance !== undefined ? req.body.distance : route.distance;
      route.estimatedTime = req.body.estimatedTime || route.estimatedTime;
      route.busid = req.body.busid || route.busid;
      // Also handle points if passed
      if (req.body.boardingPoints) route.boardingPoints = req.body.boardingPoints;
      if (req.body.droppingPoints) route.droppingPoints = req.body.droppingPoints;

      const updatedroute = await route.save();
      res.json({ success: true, message: "route updated!!", route: updatedroute });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error!!!!!' });
  }
};

// New functions for boarding points
const updateBoardingPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const { boardingPoints, droppingPoints } = req.body;

    const route = await Route.findById(id);
    if (!route) {
      return res.status(404).json({ success: false, message: "Route not found" });
    }

    if (boardingPoints) route.boardingPoints = boardingPoints;
    if (droppingPoints) route.droppingPoints = droppingPoints;
    
    await route.save();

    res.status(200).json({ success: true, message: "Stops updated", route });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating stops", error });
  }
};

const deleteBoardingPoint = async (req, res) => {
  try {
    const { routeId, pointId } = req.params;

    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ success: false, message: "Route not found" });
    }

    route.boardingPoints = route.boardingPoints.filter(point => point._id.toString() !== pointId);
    await route.save();

    res.status(200).json({ success: true, message: "Boarding point deleted", route });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting boarding point", error });
  }
};

const getRoutebyid=async(req,res)=>{
  try { 
    const {id} = req.params;//fetch id from url
    if(!mongoose.Types.ObjectId.isValid(id)){ //check for valid id 
      return res.status(404).json({success:false,message:"Invalid route ID format",});
    }
    const route = await Route.findById(id);
    if(!route){
      return res.status(404).json({success:false,message:"route not found",});    
    }
    res.status(200).json({success:true,route});
  } catch (error) {
    res.status(500).json({success:false,message:"error fetching route",error});
    console.log(error)
  }
  
}

// const login = async(req,res)=>{
//   try {
//     const {email,password} = req.body;
//     const user = await User.findOne({email:email,password:password});
//     if(!user){
//       res.json({success:false,message:"Invalid credential"});
//     }else{
//       const Token= await jwt.sign(user.id,SECRECT_KEY);
//       res.json({success:true,message:"Login successfully", Token})
//     }
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:"server error", Token})
    
//   }
// }


// const getBusRoute = async (req, res) => {
//   try {
//     // Extracting search parameters from the query string
//     const { startpoint, endpoint, date } = req.query;

//     // Build the query dynamically
//     const query = {};
//     if (startpoint) query.startpoint = startpoint;
//     if (endpoint) query.endpoint = endpoint;
//     if (date) query.date = { $gte: new Date(date) };  // Assuming you want to search for routes starting on or after the given date

//     // Fetch the routes based on the query
//     const routes = await Route.find(query);

//     res.status(200).json({ routes });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching routes", err });
//   }
// };



// const getBusRoute = async (req, res) => {
//   try {
//     console.log("Received Query Params:", req.query);
//     const { startpoint, endpoint, date } = req.query;

//     const query = {};
//     if (startpoint) query.startpoint = startpoint;
//     if (endpoint) query.endpoint = endpoint;

//     let routes = await Route.find(query).populate("routeId"); // Use routeId instead of busid

//     console.log("Fetched Routes:", routes);

//     if (date) {
//       const selectedDate = new Date(date);
//       routes = routes.filter(route => 
//         route.routeId && new Date(route.routeId.bustime).toDateString() === selectedDate.toDateString()
//       );
//     }

//     console.log("Filtered Routes:", routes);
//     res.status(200).json(routes);
//   } catch (err) {
//     console.error("Error fetching bus routes:", err);
//     res.status(500).json({ message: "Error fetching routes", err });
//   }
// };

// const getBusRoute = async (req, res) => {
//   try {
//     console.log("Received Query Params:", req.query);
//     const { startpoint, endpoint, date } = req.query;

//     const query = {};
//     if (startpoint) query.startpoint = startpoint;
//     if (endpoint) query.endpoint = endpoint;

//     // Populate bus details in the route
//     let routes = await Route.find(query).populate("busid");

//     console.log("Fetched Routes with Buses:", routes);

//     if (date) {
//       const selectedDate = new Date(date).toDateString(); // Convert input date to a string format
//       routes = routes.filter(route => 
//         route.busid && new Date(route.busid.bustime).toDateString() === selectedDate
//       );
//     }

//     console.log("Filtered Routes:", routes);
//     res.status(200).json(routes);
//   } catch (err) {
//     console.error("Error fetching bus routes:", err);
//     res.status(500).json({ message: "Error fetching routes", err });
//   }
// };

// const getBusRoute = async (req, res) => {
//   try {
//     console.log("Received Query Params:", req.query);
//     const { startpoint, endpoint, date } = req.query;

//     const query = {};
//     if (startpoint) query.startpoint = startpoint;
//     if (endpoint) query.endpoint = endpoint;

//     if (date) {
//       // Convert input date to strict "YYYY-MM-DD" format (ignoring time)
//       const selectedDate = new Date(date);
//       const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
//       const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

//       query.date = {
//         $gte: startOfDay,
//         $lt: endOfDay,
//       };
//     }

//     // Find matching routes
//     const routes = await Route.find(query);

//     console.log("Filtered Routes:", routes);
//     res.status(200).json(routes);
//   } catch (err) {
//     console.error("Error fetching bus routes:", err);
//     res.status(500).json({ message: "Error fetching routes", err });
//   }
// };

const getBusRoute = async (req, res) => {
  try {
      const { startpoint, endpoint, date } = req.query;
      let query = {};

      if (startpoint) query.sourceCity = startpoint;
      if (endpoint) query.destinationCity = endpoint;

      // Find any route that matches the start and end points
      // We don't filter Route by date here because a Route is a template, 
      // while Bus instances hold the specific date/time schedules.

      // Fetch the routes that match the search
      const routes = await Route.find(query);

      if (!routes || routes.length === 0) {
          console.log("No routes found for:", query);
          return res.status(404).json({ message: "No routes found", routes: [], buses: [] });
      }

      console.log("Routes found:", routes);

      // Fetch the buses linked to the found routes where the bus date matches the search date
      const routeIds = routes.map(route => route._id);
      
      let busQuery = { Routeid: { $in: routeIds } };
      
      if (date) {
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);

          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);

          busQuery.bustime = { $gte: startOfDay, $lte: endOfDay };
      }

      const buses = await Bus.find(busQuery);

      console.log("Buses found for date:", buses);

      // ✅ Return BOTH route and bus details
      res.json({ routes, buses });

  } catch (error) {
      console.error("Error fetching route or bus details:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};







// const getBusRoute = async (req, res) => {
//   try {
//     console.log("Received Query Params:", req.query);
//     const { startpoint, endpoint, date } = req.query;

//     const query = {};
//     if (startpoint) query.startpoint = startpoint;
//     if (endpoint) query.endpoint = endpoint;

//     // Convert date to a comparable format
//     const selectedDate = new Date(date).toISOString().split("T")[0]; 

//     console.log("Converted Date for Comparison:", selectedDate);

//     // Fetch routes and populate bus details
//     let routes = await Route.find(query).populate("busid");

//     console.log("Fetched Routes with Buses:", routes);

//     // Filter by date only if busid exists
//     routes = routes.filter(route => 
//       route.busid && 
//       new Date(route.busid.bustime).toISOString().split("T")[0] === selectedDate
//     );

//     console.log("Filtered Routes:", routes);
//     res.status(200).json(routes);
//   } catch (err) {
//     console.error("Error fetching bus routes:", err);
//     res.status(500).json({ message: "Error fetching routes", err });
//   }
// };







// const getBusDetails = async (req, res) => {
//   try {
//     let routeIds = req.query.routeIds;

//     // Ensure routeIds is an array
//     if (!Array.isArray(routeIds)) {
//       routeIds = routeIds.split(",");
//     }

//     console.log("Received Route IDs:", routeIds); // Debugging log

//     const buses = await Bus.find({ Routeid: { $in: routeIds } }); // Fetch buses for those routes

//     console.log("Fetched Buses:", buses); // Debugging log

//     res.json({ buses });
//   } catch (error) {
//     console.error("Error fetching bus details:", error);
//     res.status(500).json({ error: "Error fetching bus details" });
//   }
// };



module.exports = {
  createroute,
  getroute,
  deleteroute,
  updateroute,
  getRoutebyid,
  getBusRoute,
  updateBoardingPoints,
  deleteBoardingPoint
};