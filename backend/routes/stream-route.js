const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verify = require('../routes/verifyToken')
const streamingController = require('../controllers/streamController');

//router.get('/movies', streamingController.stream_video_get);

router.get('/:id',streamingController.stream_video);

module.exports = router;