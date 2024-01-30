const express = require("express")

const router = express.Router();
const tablecontroller = require("../controllers/table-controller")



router.get("/table" ,tablecontroller.getTables)
router.post("/table/:token",tablecontroller.reserveTable)

module.exports = router;