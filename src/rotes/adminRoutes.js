const express = require("express")

const router = express.Router();
const tablecontroller = require("../controllers/table-controller")

const adminMiddlewares = require("../middlewares/admin")



router.get("/table" ,adminMiddlewares,tablecontroller.getTables)
router.post("/create",adminMiddlewares,tablecontroller.createTable)
router.put("/update/:id",adminMiddlewares,tablecontroller.updateTable)
router.delete("/delete/:id",adminMiddlewares, tablecontroller.deleteTable)

module.exports = router;