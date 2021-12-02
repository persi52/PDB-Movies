import '../css/reset.css'
import '../css/style.css'
import '../css/favourites.css'
import React, { useState, useEffect } from 'react'
import Star from "../icons/star.png"
import Following from "../icons/following.png"
import Heart from "../icons/heart.png"
import Eye from "../icons/eye.png"
import {Link} from 'react-router-dom'
import StarRatingStatic from './StarRatingStatic';
import { getMovies, getRatedMovies, getFavouritesMovies } from '../routes/movieRoutes';

function Favourites() {

    const [movies, setMovies] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [favouritesMovies, setFavouritesMovies] = useState([]);

    useEffect(() =>{
        getMovies().then((resp)=>{setMovies(resp)});
        getRatedMovies().then(resp=>setRatedMovies(resp));
        getFavouritesMovies().then(resp=>setFavouritesMovies(resp));
      }, []);

      const url = "movie/";
    
    function showRatedMovies(){
        if(ratedMovies==='No movies were rated')return ratedMovies
        return(
            ratedMovies.map(movie => (
                <a key={movie.movie_id} className="fav-movie-item">
                <Link to={url + `${movie.movie_id}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                    <div className="movie-item-section-right">
                    <div className="fav-movie-info">
                        <p className="fav-movie-title">{movie.title}</p>
                        <p className="year-of-production">{movie.year_of_production}</p>
                    </div>
                    <div className="rating">{StarRatingStatic(movie.rate)}</div>
                    </div> 
                </Link>
                </a>
             ))
        )
    }

    function showFavouritesMovies(){
        if(favouritesMovies==='No favourite movies') return favouritesMovies
        else{
        favouritesMovies.map(movie => (
            <a key={movie.movie_id} className="fav-movie-item">
            <Link to={url + `${movie.movie_id}`}>
                <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                <div className="movie-item-section-right">
                <div className="fav-movie-info">
                    <p className="fav-movie-title">{movie.title}</p>
                    <p className="year-of-production">{movie.year_of_production}</p>
                </div>
                </div> 
            </Link>
            </a>
         ))}
    }

    return (

            <section className="container">
                    <div classname="favourites-page">
                        <div className="fav-movies-section-box ">
                            <div className="section-header">
                                <img src={Star} className="header-icon"/>
                                <h2>Ocenione filmy</h2>
                            </div>
                                <div className="fav-movie-list">
                                {showRatedMovies()}  
                                </div>
                            </div>
                        
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Heart} className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showFavouritesMovies()}  
                            </div>
                        </div>
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Eye} className="header-icon"></img>
                                <h2>Do obejrzenia</h2>
                            </div>
                            <div className="fav-movie-list">
                                {movies.map(movie => (
                                    <a key={movie.movie_id} className="fav-movie-item">
                                    <Link to={url + `${movie.movie_id}`}>
                                        <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                                        <div className="movie-item-section-right">
                                        <div className="fav-movie-info">
                                            <p className="fav-movie-title">{movie.title}</p>
                                            <p className="year-of-production">{movie.year_of_production}</p>
                                        </div>
                                        </div> 
                                    </Link>
                                    </a>
                                 ))}  
                            </div>
                        </div>
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Following} className="header-icon"></img>
                                <h2>Polecone przez znajomych</h2>
                            </div>
                            <div className="fav-movie-list">
                                {movies.map(movie => (
                                    <a key={movie.movie_id} className="fav-movie-item">
                                    <Link to={url + `${movie.movie_id}`}>
                                        <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                                        <div className="movie-item-section-right">
                                        <div className="fav-movie-info">
                                            <p className="fav-movie-title">{movie.title}</p>
                                            <p className="year-of-production">{movie.year_of_production}</p>
                                        </div>
                                        </div> 
                                    </Link>
                                    </a>
                                 ))}  
                            </div>
                        </div>
                        </div>
            </section>

    )
}

export default Favourites;
