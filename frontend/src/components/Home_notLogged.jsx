import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import '../css/home_notlogged.css'
import axios from 'axios';
import React, { Component, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import PhotoCollage from "../icons/kolaz.png"

const api = axios.create({
  baseURL: "http://localhost:5000/api/movies",
  withCredentials: true
})

function Home() {

  useEffect(() =>{
    getMovies();
  }, []);

  const [movies, setMovies] = useState([]);
 

  const getMovies = async () => {
    let data = await api.get('/get_all').then(({data})=> data);
        setMovies(data);   
        console.log(data); 
  }

  const url = "movie/";

  
  return (
    <div>

    <section class="home-page-container">
            <div class="container">
                <div class="home-page">
                <div class="photo-collage">
                    <h1>Tylko u nas!</h1>
                    <img src={PhotoCollage} width="580px" height="380px"/>
                </div>
                <div class="welcome-text">
                    <p>
                        Dołącz do nas, aby oglądać <br/>najnowsze produkcje.
                    </p>
                    <button type="button" class="submit-button">Zarejestruj się</button>
                </div>
            </div>
        </div>
        </section>

    <section className="movie-list-container container">
            <div class="movie-genre-box"> 
              <h2 class="movie-genre-title">Popularne</h2> 
              <div class="horizontal-scroll-box">
              <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                            <div className="movie-item">
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div class="image-overlay">
                                <div class="movie-title-overlay">{movie.title}
                                </div>
                              </div>
                          </div>
                      ))}       
                    </div>
                  </div>
            </div>
    </section>
    </div>
  );
}


export default Home;