const e = require("express");
const express = require("express");
const fs = require('fs');
const router = express.Router();
const pool = require('../models/db');
const verifyToken = require("../controllers/verifyToken");

const getMovies = async(req,res) =>{    

        try{
            pool.query('SELECT * FROM movies',(err,results)=>{
                res.status(200).send(results.rows);
               // console.log(results);
            })
        }catch(err){
            console.log(err);
        }      
    
};

const getMoviesByGenre = async(req,res) =>{
    
    try{
        pool.query('SELECT * FROM movies where $1=ANY(genre_id)',[req.params.genre_id],(err,results)=>{
         

            res.status(200).send(results.rows);
           // console.log(results);
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
           // console.log(results);
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
           // console.log(results);
        })
    }catch(err){
        console.log(err);
    }    
}

module.exports = {
    getMovies,
    getMoviesByGenre,
    getMovieById,
    getGenres
}