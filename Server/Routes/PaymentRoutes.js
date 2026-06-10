const express = require("express");
const router = express.Router();
const PaymentController = require("../Controller/PaymentController");

// Define API routes
router.get("/", PaymentController.getAllPayments);
router.post("/", PaymentController.createPayment);

module.exports = router;
