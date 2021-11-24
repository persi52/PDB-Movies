const express = require("express");
const fs = require('fs');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const verifyToken = require("../controllers/verifyToken");


router.post('/add',friendsController.addFriend);
router.post('/remove',verifyToken,friendsController.removeFriend);
router.get('/get',verifyToken,friendsController.getUserFriends);



module.exports = router;