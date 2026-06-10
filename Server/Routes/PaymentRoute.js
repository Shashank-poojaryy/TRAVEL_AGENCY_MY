const express = require("express");
const router = express.Router();
const {createPayment,getAllPayments,updatePayment} = require("../Controller/PaymentController");


// Routes for payment handling
router.post("/createPayment", createPayment);
router.get("/getAllPayments", getAllPayments);
router.put('/updatePayment/:id',updatePayment);


// router.delete("/getPaymentById", getPaymentById);

module.exports = router;
