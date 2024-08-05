const express = require("express");
const router = express.Router();

const Bookingcontollers = require("../controllers/ฺBookingcontrollers")
const middlewares = require("../middlewares/authMiddleware")


router.post("/booking",middlewares,Bookingcontollers.createBooking)
router.get('/getbookings', Bookingcontollers.getAllBookings);
router.put('/updateBooking',Bookingcontollers.updateBooking)
router.delete('/deleteBooking',Bookingcontollers.deleteBooking)







module.exports = router;