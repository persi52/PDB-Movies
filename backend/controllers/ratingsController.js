const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("./verifyToken");

const addRate = async(req,res) =>{

   // console.log(req.user.user_id)//res.send(req.param['set-cookie']);
   // const user = req.user;     

    try{
        pool.query('INSERT INTO ratings (user_id,rate,movie_id)' +
        'values ($1, $2, $3)',[1, req.body.rate, req.body.movie_id],(err,results)=>{ 

            if(err) throw err;
            else res.status(200).send('Rate has been succesfully added to movie ' + req.body.movie_id);              
            //console.log(results);
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

const getRatesByMovieId = async(req,res) =>{

    let ratesAmount, averageRate; 
 
    try{
        
       
            pool.query('SELECT COUNT(*) FROM ratings WHERE movie_id=$1',[req.params.movie_id],
                (err,results)=>{

            if(err) throw err;           

            
            if(results.rows.length>0)            
             {
                ratesAmount = results.rows[0].count;
                pool.query('SELECT SUM(rate) FROM ratings WHERE movie_id=$1',[req.params.movie_id],
                (err,results)=>{

                    if(err) throw err;  
                    
                    else{
                        
                        averageRate = Math.round(((  results.rows[0].sum/ratesAmount) + Number.EPSILON) * 100) / 100;
                        console.log(ratesAmount)
                        res.status(200).send({
                            averageRate,
                            ratesAmount
                        })                    
                    }
                
                }) 
            }
            else return res.status(200).send('No rates for movie_id= '+req.params.movie_id);           
            
        })
       
    
        
        
        
        
        

             
              
        





    }catch(err){
        console.log(err);
    }   

     
     
     
 }

 const getUserRate = async(req,res) =>{

 }
 

module.exports = {
    addRate,
    getRatesByMovieId,
    getUserRate,
    getBokiem
}