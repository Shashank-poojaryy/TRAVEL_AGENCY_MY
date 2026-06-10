

const mongoose=require('mongoose') //import mongoose

const feedbackSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    // rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }  // Track when review was added
});
//exporting 
module.exports= mongoose.model('Feedback', feedbackSchema)