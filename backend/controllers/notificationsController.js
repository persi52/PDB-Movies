const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');



const getNotifications = async(req,res) =>{
  const user = req.user;

  try{
    pool.query('SELECT * FROM notifications WHERE user_id=$1 ORDER BY notification_id DESC',[user.user_id],
    (err,results)=>{
        res.status(200).send(results.rows);
       // console.log(results);
    })
    }catch(err){
    console.log(err);
    }
       
}



module.exports = {
    getNotifications
};