const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');




const getUserNotifications = async(req,res) =>{
  //const user = req.user;

  try{
    pool.query('SELECT * FROM notifications WHERE receiver_id=$1 ORDER BY notification_id DESC',[1],
    (err,results)=>{
        if(results.rows.length>0)
        res.status(200).send(results.rows);
        else res.status(200).send('No nofifications');
       // console.log(results);
    })
    }catch(err){
    console.log(err);
    }
       
}

const sendNotification = async(body) =>{
  //console.log(body);

  try{
    pool.query('INSERT INTO notifications (type,movie_id,sender_id,receiver_id) ' +
    'values ($1, $2, $3, $4)',[body.type,body.movie_id,
      body.user_id,body.receiver_id],
    (err,results)=>{
        if (err) throw err;
       // console.log(results);
    })
    }catch(err){
    console.log(err);
    }
}



module.exports = {
    getUserNotifications,
    sendNotification
};