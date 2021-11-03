const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require("../controllers/verifyToken");

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);
router.get('/getUsers',verifyToken,authController.getUsers);
router.post('/checkUser', authController.checkUser);
router.get('/getUserById/:id', authController.getUserById);

module.exports = router;