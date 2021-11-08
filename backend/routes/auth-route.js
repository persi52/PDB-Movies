const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require("../controllers/verifyToken");

router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);
router.delete('/signOut', authController.signOut);
router.get('/getUsers',authController.getUsers);
router.get('/getCurrentUser', verifyToken ,authController.getCurrentUser);
router.get('/getUserById/:id',verifyToken, authController.getUserById);

module.exports = router;