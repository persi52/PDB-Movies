const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("../controllers/verifyToken");

const recommendMovie = async(req,res) =>{

    console.log(req.user.user_id)//res.send(req.param['set-cookie']);

    try{
        pool.query('INSERT INTO recommendations (sender_id,receiver_id,movie_id)' +
        'values ($1, $2, $3)',[req.user.user_id, req.body.receiver_id, req.body.movie_id],(err,results)=>{ 
                   
            res.status(200).send(results.rows);
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
    
}

module.exports = {
    recommendMovie
}
