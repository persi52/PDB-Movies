const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("../controllers/verifyToken");

const recommendMovie = async(req,res) =>{
    res.send(req.headers['token']);
}

module.exports = {
    recommendMovie
}
