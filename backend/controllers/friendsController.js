const { log } = require("console");
const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("./verifyToken");
//import { sendNotification } from "./notificationsController";

const sendFriendRequest = async(req,res) =>{

}

const addFriend = async(req,res) =>{
      const user = req.user;

    if(req.body.receiver_id == user.user_id)
        res.status(400).send('Wrong request'); 
    

    try{
        pool.query('SELECT * FROM friends WHERE (friend_one_id=$1 AND friend_two_id=$2) OR (friend_one_id=$2 AND friend_two_id=$1)',
        [user.user_id,req.body.receiver_id],(err,results)=>{
           
        if(results.rows.length>0) res.status(400).send('User is already your friend!');
        else
            pool.query('INSERT INTO friends (friend_one_id,friend_two_id) ' +
            'values ($1, $2)',[user.user_id, req.body.receiver_id],(err,results)=>{ 

                if(err) throw err;
                else res.status(200).send('User added to friends');                
            })
    })
    }catch(err){
        res.status(403).send('Invalid statement');

    }

}

const removeFriend = async(req,res) =>{
    const user = req.user;
    if(user.user_id==req.body.receiver_id)
        res.status(400).send('Wrong request');

    try{
        pool.query('DELETE FROM friends ' +
        'WHERE (friend_one_id=$1 AND friend_two_id=$2) ' + 
        'OR (friend_one_id=$2 AND friend_two_id=$1)',[user.user_id,req.body.receiver_id],
        (err,results)=>{
            
            //console.log(req.body.receiver_id,user);
           res.status(200).send('User deleted from friends succesfully');
    
        })
    }catch(err){
        console.log(err);
    }
}
const getBokiem = async(req,res) =>{

    try{
    pool.query('SELECT SUM(rate) FROM ratings WHERE movie_id=1',
    (err,results)=>{

       console.log(results.rows[0].sum);

    })
}catch(err){
    console.log(err);
}
}

 const getUserFriends = async(req,res) =>{

   const user = req.user;
    try{
        pool.query('SELECT DISTINCT u.nickname,u.user_id FROM users u INNER JOIN friends f ' + 
        'ON (u.user_id = f.friend_one_id OR u.user_id = f.friend_two_id) ' +
        'WHERE (f.friend_one_id=$1 OR f.friend_two_id=$1) AND u.user_id <> $1',[user.user_id],
//         SELECT DISTINCT u.nickname,u.user_id 
//          FROM users u 
//          INNER JOIN friends f ON (u.user_id=f.friend_two_id OR u.user_id = f.friend_one_id)
//         WHERE (f.friend_one_id=7 OR f.friend_two_id=7) AND u.user_id<>7
        (err,results)=>{
            if(results.rows.length>0)
            res.status(200).send(results.rows);
            else res.status(200).send('You got no friends che che');
           // console.log(results);
        })
    }catch(err){
        console.log(err);
    }

 }
 

module.exports = {
    addFriend,
    removeFriend,
    getUserFriends,
    getBokiem
}