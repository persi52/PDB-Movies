const bcrypt = require('bcrypt'); // hashowanie haseł
const pool = require('../models/db');  //database   
const Joi = require('joi'); 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// router.use(function(req,res,next)  {
//     next();
// })

router.post('/signUp', async (req, res) => {
   
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
                     'RETURNING id, password', [req.body.nickname, req.body.email, hashedPassword],  
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
   
});

router.post('/signIn', async (req, res) => {
    
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
                const token = jwt.sign({
                    id : results.rows[0].id,
                }, process.env.TOKEN_SECRET);
                res.header('auth-token', token).send(token);
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
   
   

});


module.exports = router;