

const mongoose=require('mongoose') //import mongoose

const bookingSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    busid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    seatNumber: { type: Number, required: true },
    travellerName: { type: String, required: true },
    travellerAge: { type: Number, required: true },
    travellerGender: { type: String, required: true },
    travellerEmail: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },  // Track when booking was made
    travelDate: { type: Date, required: true },  // Actual date of travel
    boardingPoint: { type: String, required: true },
    droppingPoint: { type: String, required: true },
    status: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' }
});
//exporting 
module.exports= mongoose.model('Booking', bookingSchema)  