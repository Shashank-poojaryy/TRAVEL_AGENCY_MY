const { default: mongoose } = require('mongoose');
const Contact = require('../Models/Contact_models'); // Importing the Contact model
const User = require('../Models/user_model'); // Importing User model to validate email

// Handle contact form submission
const submitContactForm = async (req, res) => {
    try {
        const { userEmail, name, phone, message } = req.body;
        
        console.log("Received userEmail from frontend:", userEmail);  // 🔍 Debug log

        const userExists = await User.findOne({ email: userEmail });

        if (!userExists) {
            console.log("User not found in database!");  // 🔍 Debug log
            return res.status(400).json({ success: false, message: "User email not found!" });
        }

        // If found, create contact entry
        const contact = new Contact({ userEmail: userExists._id, name, phone, message });  // ✅ Store userId, not email
        await contact.save();

        res.status(201).json({ success: true, message: "Contact form submitted successfully!", contact });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// Fetch all contact messages
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().populate('userEmail', 'email'); // Populate user email
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching contact messages", error: error.message });
    }
};

// Delete contact message
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Contact message deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting contact message", error: error.message });
    }
};


// Exporting the functions
module.exports = { submitContactForm, getAllContacts, deleteContact};
