const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("../controllers/verifyToken");

const recommendMovie = async(req,res) =>{
    console.log(req.cookies.token)//res.send(req.param['set-cookie']);
}

module.exports = {
    recommendMovie
}
