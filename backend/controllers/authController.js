const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../models/db');  //database   
const Joi = require('joi'); 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const signUp = async(req,res) =>{
   
    const schema = Joi.object({
        nickname: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).required(),
        repeatPassword: Joi.ref('password')
    });

    const validation = schema.validate(req.body);    //sprawdzenie walidacji 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }   

    try{  

    const hashedPassword =  await bcrypt.hash(req.body.password, 10); //hashowanie hasła       
   

    pool.query(
        'SELECT * FROM users' + 
        ' WHERE email = $1', [req.body.email],
        (err, results) => {
            if(err){
                throw err;
            }        

            if(results.rows.length >0){
                res.status(422).send('Email is already registered');
               //render Email is already registered
            }else{                    
                pool.query(
                    'INSERT INTO users (nickname,email,password)' +
                     'VALUES ($1, $2, $3)' +
                     'RETURNING user_id, password', [req.body.nickname, req.body.email, hashedPassword],  
                    (err, results) => {
                        if(err){
                            throw err;                        
                    } 
                    console.log(results.rows);
                })             
            }
      }
    )   
    }catch(err){
        console.log(req.email,req.password)
        res.status(500).send()
   }  
   
};

const signIn = async (req,res) =>{
    
    try{

    pool.query('SELECT * FROM users' + 
    ' WHERE email = $1', [req.body.email],
    (err, results) => {
        if(err){
            throw err;
        }            

        if(results.rows.length > 0){   

              
            bcrypt.compare(req.body.password,results.rows[0].password).then((result)=>{ //porownanie zahashowanego hasla
            if(result){
                //console.log(results.rows[0].user_id) 
                const token = jwt.sign({
                    id : results.rows[0].user_id,
                }, process.env.TOKEN_SECRET);

       
                res.cookie('token', token, {
                    secure: true, // set to true if your using https
                    httpOnly: true,
                    sameSite: 'lax'
                  }).send(token);
                res.end();
                //res.send('Login success');
                // do stuff
            } else {
                res.status(401).send('Wrong email or password');
                // do other stuff
            }
            })
            .catch((err)=>console.error(err))  
            
            
        }
         else{ 
            res.status(401).send("Wrong email or password");
         }         
   
        })
    }catch(err){
         console.log(err)
         res.status(500).send()
     } 
   
   

};

const getUsers = async (req,res) =>{
   
    try{
        pool.query('SELECT * FROM users',(err,results)=>{        
            res.status(200).send(results.rows);
            //console.log(results);
        })
    }catch(err){
        console.log(err);
    }
   
};

const getUserById = async(req,res) =>{

    // const token = req.cookies.token;
    // const user_id = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(req.user);
    try{
        pool.query('SELECT * FROM users WHERE user_id=$1',[req.params.id],(err,results)=>{

            res.status(200).send(results.rows);
           // console.log(results);
        })
    }catch(err){
        console.log(err);
    }
};

const checkUser = async(req,res, next) => {
    //const token = req.cookies.jwt;

   // const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                next();
            }else {
                console.log(decodedToken);
                let user = await pool.query('SELECT * FROM users WHERE user_id = $1',decodedToken.user_id)
                console.log(user);
                next();
            }
        });
        req.user = verified;
        next();
    }catch (err){
        res.status(400).send('Invalid Token');
    }
};


module.exports = {
    signUp,
    signIn,
    checkUser,
    getUsers,
    getUserById
};