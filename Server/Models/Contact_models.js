const mongoose = require('mongoose');

// Define Contact Schema with email as a foreign key
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    userEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Contact', contactSchema);
