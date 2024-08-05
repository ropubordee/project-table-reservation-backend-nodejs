const express = require("express")

const router = express.Router();

const PaymentStatuscontrollers = require("../controllers/PaymentPagecontrollers")

router.get("/payment/:id",PaymentStatuscontrollers.paymentStatusbyId)

module.exports = router

