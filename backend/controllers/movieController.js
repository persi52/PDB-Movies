const e = require("express");
const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("../controllers/verifyToken");
const {getUsers} = require("../controllers/authController.js")


const getMovies = async(req,res) =>{  
   
        try{      
       
            pool.query('SELECT * FROM movies',(err,results)=>{

                if(err) throw err;
                else res.status(200).send(results.rows);              
              
            })
        }catch(err){
            console.log(err);
        } 
         
    
};

const getMoviesByGenre = async(req,res) =>{
    
    try{
        pool.query('SELECT * FROM movies where $1=ANY(genre_id)',[req.params.genre_id],(err,results)=>{         

            res.status(200).send(results.rows);
          
        })
    }catch(err){
        console.log(err);
    }   
   
}

const getMovieById = async(req,res) =>{    

    try{
        pool.query('SELECT * FROM movies WHERE movie_id=$1',[req.params.movie_id],
        (err,results)=>{
            res.status(200).send(results.rows[0]);           
        })
    }catch(err){
        console.log(err);
    }      

};

const getGenres = async(req,res) =>{
    try{
        pool.query('SELECT * FROM genres',
        (err,results)=>{
            res.status(200).send(results.rows);          
        })
    }catch(err){
        console.log(err);
    }    
}

const getRatedMovies = async(req,res) =>{
    const user_id = req.user.user_id;
    
    try{
        pool.query('SELECT rate, movie_id FROM ratings WHERE user_id=$1 ORDER BY rate DESC',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) assignRatesToMovies(results.rows).then(data => res.status(200).send(data)) 
            else res.status(200).send('No movies were rated') 
                       
           
        })
    }catch(err){
        console.log(err);
    }   
}

async function assignRatesToMovies(rates){
    const ratedMovies = []
    for(const rate of rates){
      
        await pool.query('SELECT title, year_of_production, thumbnail FROM movies WHERE movie_id=$1',[rate.movie_id])
        .then((data) => {
            return {
                title : data.rows[0].title,
                year_of_production : data.rows[0].year_of_production,
                thumbnail : data.rows[0].thumbnail,
                rate : rate.rate,
                movie_id : rate.movie_id
            }
        }).then(data => ratedMovies.push(data))
    }

    return ratedMovies;
}

const addToFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.body.movie_id 

    try{
        pool.query('INSERT INTO favouriteMovies (user_id,movie_id) VALUES ($1,$2)',[user_id,movie_id],
        (err,results)=>{
            if(err) throw err;
            else res.status(200).send('Movie added to favourites');          
        })
    }catch(err){
        console.log(err);
    }  
} 

const getUserFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    try{
        pool.query('SELECT movie_id,title, year_of_production, thumbnail FROM movies WHERE user_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);   
            else res.status(200).send('No favourite movies')
                   
        })
    }catch(err){
        console.log(err);
    }  
} 


module.exports = {
    getMovies,
    getMoviesByGenre,
    getMovieById,
    getRatedMovies,
    getUserFavourites,
    addToFavourites,
    getGenres
}