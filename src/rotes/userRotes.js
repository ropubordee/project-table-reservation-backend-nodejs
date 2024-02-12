
const express = require('express');
const router = express.Router();
const updateuserController = require('../controllers/updateuser-Controller');

router.put('/updateRole', updateuserController.updateUserRole);

module.exports = router;
