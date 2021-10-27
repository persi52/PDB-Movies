const express = require("express");
const fs = require('fs');
const router = express.Router();
const verify = require('../routes/verifyToken')
const recommendationController = require('../controllers/recommendationController');

//router.get('/movies', streamingController.stream_video_get);

router.get('/1',recommendationController.recommendMovie);


module.exports = router;