const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require("../controllers/verifyToken");

router.get('/get_all',movieController.getMovies);
router.get('/get/:movie_id',movieController.getMovieById);
router.get('/get_all/genres/:genre_id',movieController.getMoviesByGenre);
router.get('/genres/get_all',movieController.getGenres);
router.get('/getRated',verifyToken,movieController.getRatedMovies);

module.exports = router;