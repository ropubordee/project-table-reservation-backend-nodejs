
const express = require('express');
const router = express.Router();
const updateuserController = require('../controllers/updateuser-Controller');

router.put('/updateRole', updateuserController.updateUserRole);
router.get('/users',updateuserController.gatAllusers)

module.exports = router;
