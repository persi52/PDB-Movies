const express = require("express");
const fs = require('fs');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');
const verifyToken = require("../controllers/verifyToken");


router.post('/add',ratingsController.addRate);
router.get('/getBokiem',ratingsController.getBokiem);
router.get('/get/:movie_id',ratingsController.getRatesByMovieId);


module.exports = router;