const express = require("express")
const multer = require("multer")


const storage = multer.memoryStorage();
const upload = multer({storage : storage})
const Checkslipcontrollers = require("../controllers/Checkslip-controllers")
const router = express.Router();


router.post("/checkslip",upload.single('files'),Checkslipcontrollers.Checkslip)

module.exports = router

