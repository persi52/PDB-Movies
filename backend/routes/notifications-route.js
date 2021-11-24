const express = require("express");
const fs = require('fs');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const verifyToken = require("../controllers/verifyToken");


router.get('/get',notificationsController.getUserNotifications);
router.post('/send',notificationsController.sendNotification);

module.exports = router;