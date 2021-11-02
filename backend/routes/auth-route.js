const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);
router.get('/getUsers',authController.getUsers);
router.post('/checkUser', authController.checkUser);
router.get('/getUserById/:id', authController.getUserById);

module.exports = router;