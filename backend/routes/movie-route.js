const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require("../controllers/verifyToken");

router.get('/get_all',movieController.getMovies);
router.get('/get/:movie_id',movieController.getMovieById);
router.get('/get_all/genres/:genre_id',movieController.getMoviesByGenre);
router.get('/genres/get_all',movieController.getGenres);
router.get('/getRated',verifyToken,movieController.getRatedMovies);
router.post('/add/favourites',verifyToken,movieController.addToFavourites);
router.get('/get/favourites',verifyToken,movieController.getUserFavourites);
router.post('/remove/favourites',verifyToken,movieController.removeFromFavourites);
// router.post('add/toWatch',verifyToken,movieController.addToWatch);
// router.get('/get/toWatch',verifyToken,movieController.getToWatch);
// router.post('/remove/toWatch',verifyToken,movieController.removeFromToWatch);

module.exports = router;