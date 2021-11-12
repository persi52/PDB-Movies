const express = require("express");
const fs = require('fs');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const verifyToken = require("../controllers/verifyToken");


router.post('/addComment/:movie_id',verifyToken,commentsController.addComment);
router.get('/getComments/:movie_id',commentsController.getComments);


module.exports = router;