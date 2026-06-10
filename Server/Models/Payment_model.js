const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
     busid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true } ,
     amount: {type:String, required:true},
    paymentDate: { type: Date, default: Date.now },  // Track when payment was made
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
});

module.exports= mongoose.model('Payment', paymentSchema)