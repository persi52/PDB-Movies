const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("./verifyToken");

const addFriend = async(req,res) =>{

   // console.log(req.user.user_id)//res.send(req.param['set-cookie']);
    const user = req.user;

    try{
        pool.query('SELECT * FROM friends WHERE (friend_one_id=$1 OR friend_two_id=$2) AND (friend_one_id=$1 OR friend_two_id=$2)',
        [user.user_id,req.body.receiver_id],(err,results)=>{

        if(results.rows.length>0) res.status(400).send('User is already your friend!');
        else
            pool.query('INSERT INTO friends (friend_one_id,friend_two_id) ' +
            'values ($1, $2)',[user.user_id, req.body.receiver_id],(err,results)=>{ 

                if(err) throw err;
                else res.status(200).send('User added to friends');
                //console.log(results);
            })
    })
    }catch(err){
        res.status(403).send('Invalid statement');

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
        pool.query('SELECT u.nickname FROM users u INNER JOIN friends f ON (u.user_id = f.friend_one_id OR u.user_id = f.friend_two_id)' +
        'WHERE u.user_id=$1',[user.user_id],
        (err,results)=>{
            if(results.rows.lenght>0)
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
    getUserFriends,
    getBokiem
}