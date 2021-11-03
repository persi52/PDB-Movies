const express = require("express");
const fs = require('fs');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const verifyToken = require("../controllers/verifyToken");

//router.get('/movies', streamingController.stream_video_get);

router.get('/1',verifyToken,recommendationController.recommendMovie);


module.exports = router;