import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import axios from 'axios';
import React, { Component, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

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
    <section className="movie-list-container container">
            <div className="main-movie-genre-box">
                <h2 className="main-movie-genre-title">Nowości</h2> 
                    <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                        <a key={movie.movie_id}>
                          <Link to={url + `${movie.movie_id}`}>
                            <div className="main-movie-item">
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="main-movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div class="image-overlay">
                                <div class="movie-title-overlay">{movie.title}
                                </div>
                              </div>
                          </div> 
                          </Link>
                          </a>
                      ))}       
                    </div>
            </div> 

            <div class="movie-genre-box"> 
              <h2 class="movie-genre-title">Popularne</h2> 
              <div class="horizontal-scroll-box">
              <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                        <a key={movie.movie_id}>
                          <Link to={url + `${movie.movie_id}`}>
                            <div className="movie-item">
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div class="image-overlay">
                                <div class="movie-title-overlay">{movie.title}
                                </div>
                              </div>
                          </div> 
                          </Link>
                          </a>
                      ))}       
                    </div>
                  </div>
            </div>
    </section>
    </div>
  );
}


export default Home;