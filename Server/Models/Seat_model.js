const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    seatNumber: { type: Number, required: true },
    status: { type: String, enum: ["Available", "Booked"], default: "Available" }
});

module.exports = mongoose.model("Seat", seatSchema);
