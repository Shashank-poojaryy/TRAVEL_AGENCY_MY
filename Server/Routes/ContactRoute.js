const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContacts, deleteContact } = require('../Controller/ContactController');

// POST: Submit contact form
router.post('/submit', submitContactForm);

// GET: Fetch all contact messages
router.get('/messages', getAllContacts);
router.delete('/delete/:id', deleteContact)

module.exports = router;
