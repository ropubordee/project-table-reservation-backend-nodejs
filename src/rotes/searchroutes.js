const express = require("express")


const router = express.Router();
const searchcontrollers = require("../controllers/searchcontrollers")

router.get("/tables",searchcontrollers.searchByType)
router.get("/bookings",searchcontrollers.searchByBooking)


module.exports = router;