const express = require("express")
const path = require('path');


const router = express.Router();
const tablecontroller = require("../controllers/table-controller")
const uploads = require("../middlewares/upload")
const adminMiddlewares = require("../middlewares/admin")

router.get("/images/:id",adminMiddlewares,tablecontroller.uploadImagesTable)
router.post("/uploads",uploads.array("images"),adminMiddlewares,tablecontroller.uploadImages)
router.get("/table" ,adminMiddlewares,tablecontroller.getTables)
router.post("/create",adminMiddlewares,tablecontroller.createTable)
router.put("/update/:id",uploads.array("images"),adminMiddlewares,tablecontroller.updateTable)
router.delete("/delete/:id",adminMiddlewares, tablecontroller.deleteTable)

module.exports = router;