const express = require("express")


const router = express.Router();
const tablecontroller = require("../controllers/table-controller")

router.get("/table",tablecontroller.getTables)
router.get("/images/:id",tablecontroller.uploadImagesTable)
router.get("/table/:id", tablecontroller.getTableById);
module.exports = router;