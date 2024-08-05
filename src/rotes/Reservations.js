const express = require("express")


const router = express.Router();
const productcontrolers = require ("../controllers/product-controllers")


router.post("/reservations",productcontrolers.createReservation)
router.get('/reservations/:table_id',productcontrolers.reservationsgetId)


module.exports = router;