const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/get_all',movieController.getMovies);
router.get('/get/:movie_id',movieController.getMovieById);
router.get('/get_all/genres/:movie_id',movieController.getMoviesByGenre);
router.get('/genres/get_all',movieController.getGenres);

module.exports = router;