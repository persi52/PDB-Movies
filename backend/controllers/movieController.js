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
        pool.query('SELECT r.rate, m.movie_id, m.title, m.year_of_production, m.thumbnail FROM ratings r ' + 
        'INNER JOIN movies m ON r.movie_id=m.movie_id WHERE r.user_id=$1 ORDER BY rate DESC',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows)
            else res.status(200).send('No movies were rated') 
                       
           
        })
    }catch(err){
        console.log(err); 
    }   
}

const getRecommendedMovies = async(req,res) =>{
    const user_id = req.user.user_id;
    try{
        pool.query('SELECT m.movie_id,m.title, m.year_of_production, m.thumbnail FROM movies m ' +  
        'INNER JOIN recommendations r ON r.movie_id=m.movie_id WHERE r.receiver_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);   
            else res.status(200).send('No recommended movies')
                   
        })
    }catch(err){
        console.log(err);
    }  
}

// async function assignRatesToMovies(rates){
//     const ratedMovies = []
//     for(const rate of rates){
      
//         await pool.query('SELECT title, year_of_production, thumbnail FROM movies WHERE movie_id=$1',[rate.movie_id])
//         .then((data) => {
//             return {
//                 title : data.rows[0].title,
//                 year_of_production : data.rows[0].year_of_production,
//                 thumbnail : data.rows[0].thumbnail,
//                 rate : rate.rate,
//                 movie_id : rate.movie_id
//             }
//         }).then(data => ratedMovies.push(data))
//     }

//     return ratedMovies;
// }

const addToFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.body.movie_id; 

    try{
        pool.query('SELECT * FROM favourite_movies WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(400).send('Movie is already in favourites!');
            else 
                pool.query('INSERT INTO favourite_movies (user_id,movie_id) VALUES ($1,$2)',[user_id,movie_id],
                (err,results)=>{
                    if(err) throw err;
                    else res.status(200).send('Movie added to favourites'); 
                })      
        })
    }catch(err){
        console.log(err);
    }  
} 
const getUserFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    try{
        pool.query('SELECT m.movie_id,m.title, m.year_of_production, m.thumbnail FROM movies m ' +  
        'INNER JOIN favourite_movies f ON f.movie_id=m.movie_id WHERE f.user_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);   
            else res.status(200).send('No favourite movies')
                   
        })
    }catch(err){
        console.log(err);
    }  
} 

const getFriendFavourites = async(req,res) => {
    const user_id = req.params.user_id

    try{
        pool.query('SELECT m.movie_id,m.title, m.year_of_production, m.thumbnail FROM movies m ' +  
        'INNER JOIN favourite_movies f ON f.movie_id=m.movie_id WHERE f.user_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);   
            else res.status(200).send('Your friend has no favourite movies yet')
                   
        })
    }catch(err){
        console.log(err);
    }  
}

const removeFromFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.body.movie_id;
    try{
        pool.query('DELETE FROM favourite_movies WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{

            if(err) throw err;
            else res.status(200).send('Movie successfully deleted from favourites')
                   
        })
    }catch(err){
        console.log(err);
    }  
} 

const isMovieInFavourites = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.params.movie_id
    try{
        pool.query('SELECT * FROM favourite_movies WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0)
            res.status(200).send({isFavourite : true});  
            else res.status(200).send({isFavourite : false});        
        })
    }catch(err){
        console.log(err);
    }    
}

const addToWatch = async(req,res) =>{
    const user_id = req.user.user_id;
    const movie_id = req.body.movie_id; 

    try{
        pool.query('SELECT * FROM movies_to_watch WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(400).send('Movie is already in ToWatch playlist!');
            else 
                pool.query('INSERT INTO movies_to_watch (user_id,movie_id) VALUES ($1,$2)',[user_id,movie_id],
                (err,results)=>{
                    if(err) throw err;
                    else res.status(200).send('Movie added to ToWatch playlist'); 
                })      
        })
    }catch(err){
        console.log(err);
    } 
}

const getUserToWatch = async(req,res) =>{
    const user_id = req.user.user_id;
    try{
        pool.query('SELECT m.movie_id,m.title, m.year_of_production, m.thumbnail ' + 
        'FROM movies m INNER JOIN movies_to_watch mtw ON mtw.movie_id=m.movie_id ' +
        'WHERE mtw.user_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);
            else res.status(200).send('No ToWatch movies')

        })
    }catch(err){
        console.log(err);
    }  
}

const getFriendToWatch = async(req,res) => {
    const user_id = req.params.user_id

    try{
        pool.query('SELECT m.movie_id,m.title, m.year_of_production, m.thumbnail FROM movies m ' +  
        'INNER JOIN movies_to_watch mtw ON mtw.movie_id=m.movie_id WHERE mtw.user_id=$1',[user_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0) res.status(200).send(results.rows);   
            else res.status(200).send('Your friend has no ToWatch movies yet')
                   
        })
    }catch(err){
        console.log(err);
    }  
}

const removeFromToWatch = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.body.movie_id;
    try{
        pool.query('DELETE FROM movies_to_watch WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{

            if(err) throw err;
            else res.status(200).send('Movie successfully deleted from ToWatch playlist!')
                   
        })
    }catch(err){
        console.log(err);
    }  
} 

const isMovieInToWatch = async(req,res) => {
    const user_id = req.user.user_id;
    const movie_id = req.params.movie_id
    try{
        pool.query('SELECT * FROM movies_to_watch WHERE user_id=$1 AND movie_id=$2',[user_id,movie_id],
        (err,results)=>{
            if(err) throw err;

            if(results.rowCount>0)
            res.status(200).send({isOnToWatch : true});  
            else res.status(200).send({isOnToWatch : false});        
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
    getRecommendedMovies,
    getUserFavourites,
    getFriendFavourites,
    addToFavourites,
    isMovieInFavourites,
    removeFromFavourites,
    removeFromToWatch,
    addToWatch,
    getUserToWatch,
    getFriendToWatch,
    isMovieInToWatch,
    getGenres
}