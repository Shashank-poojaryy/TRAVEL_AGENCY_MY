// const Helloworld = require("./text")
//importing express
const express=require('express');
const app=express();
require('dotenv').config();
//importing cors
const cors=require('cors');
const dbConnections = require("./db");
// 1. import userroute
const userRoute=require('./Routes/UserRoute');
// const studentRoute=require('./Routes/StudentRoute');
const adminRoute= require('./Routes/AdminRoute')
const busRoute= require('./Routes/Busroute_Route')
const bus= require('./Routes/Bus_Route')
const contact=require('./Routes/ContactRoute')
const booking=require('./Routes/BookingRoute')
const seat=require('./Routes/SeatRoute')
const payment=require('./Routes/PaymentRoute')
const dashboard=require('./Routes/DashboardRoute')
function Hello(){
    console.log("Welcome to node js")
}
Hello()

//import function from another file
// Helloworld();
//creating port no
const portno=4000
app.listen(portno,()=>{
    console.log("Server is running on portno:" +portno);
})

dbConnections();

//sending requesting// testing api request
app.get('/',(req,res)=>{
    res.send("hello postman")
})

app.get('/name',(req,res)=>{
    res.send("Our project is Travel Agency")
})
// //cors->cross origin resource sharing
app.use(cors());
app.use(express.json()) //parse json requests
app.use('/api/user', userRoute) //end point
// app.use("/api/image/",express.static("./Uploads"));
app.use('/api/admin', adminRoute);
app.use('/api/route', busRoute);
app.use('/api/bus', bus);
app.use('/api/contact', contact)
app.use('/api/booking', booking);
app.use('/api/seat', seat);
app.use('/api/payment',payment )
app.use('/api/dashboard',dashboard )