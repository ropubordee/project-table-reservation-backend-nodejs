const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/register", authController.r);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPasswordd);
router.get("/forget-password/:token", authController.verifyForgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;