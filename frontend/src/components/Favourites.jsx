import '../css/reset.css'
import '../css/style.css'
import '../css/favourites.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Star from "../icons/star.png"
import Following from "../icons/following.png"
import Heart from "../icons/heart.png"
import Eye from "../icons/eye.png"
import Photo from "../icons/kevin.jpg"
import {Link} from 'react-router-dom'


const api = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

function Favourites() {

    useEffect(() =>{
        getMovies();
      }, []);
    
      const [movies, setMovies] = useState([]);
     
    
      const getMovies = async () => {
        let data = await api.get('/get_all').then(({data})=> data);
            setMovies(data);
      }
    
      const url = "movie/";
    
    return (

            <section className="landing-page ">
                <div className="container">
                    <div classname="favourites-page">
                        <div className="rated-movies-section movies-section-box">
                            <div className="section-header">
                                <img src={Star} className="header-icon"/>
                                <h2>Ocenione filmy</h2>
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
                                        <div className="rating">* * * * *</div>
                                        </div> 
                                    </Link>
                                    </a>
                                ))}  

                            </div>
                            </div>
                        </div>
                        <div className="movies-section movies-section-box">
                            <div className="section-header">
                                <img src={Heart} className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
                            </div>
                        </div>
                        <div className="movies-section movies-section-box">
                            <div className="section-header">
                                <img src={Eye} className="header-icon"></img>
                                <h2>Do obejrzenia</h2>
                            </div>
                        </div>
                        <div className="movies-section movies-section-box">
                            <div className="section-header">
                                <img src={Following} className="header-icon"></img>
                                <h2>Polecone przez znajomych</h2>
                            </div>
                        </div>
                    </div>
            </section>

    )
}

export default Favourites;
