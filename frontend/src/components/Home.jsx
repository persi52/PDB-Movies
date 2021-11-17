import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getMovies } from '../routes/movieRoutes';

function Home() {

  useEffect(() =>{
    getMovies().then((resp)=>{setMovies(resp)});
  }, []);

  

  const [movies, setMovies] = useState([]);

  const url = "movie/";

  
  return (
    <div>
    <section className="movie-list-container container">
            <div className="main-movie-genre-box">
                <h2 className="main-movie-genre-title">Nowości</h2> 
                    <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                        
                          <Link to={url + `${movie.movie_id}`}>
                            <div className="main-movie-item">
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="main-movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div className="image-overlay">
                                <div className="movie-title-overlay">{movie.title}
                                </div>
                              </div>
                          </div> 
                          </Link>
                          
                      ))}       
                    </div>
            </div> 

            <div className="movie-genre-box"> 
              <h2 className="movie-genre-title">Popularne</h2> 
              <div className="horizontal-scroll-box">
              <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                          <Link to={url + `${movie.movie_id}`} key={movie.movie_id}>
                            <div className="movie-item" key={movie.movie_id}>
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div className="image-overlay">
                                <div className="movie-title-overlay">{movie.title}
                                </div>
                              </div>
                          </div> 
                          </Link>
                      ))}       
                    </div>
                  </div>
            </div>
    </section>
    </div>
  );
}


export default Home;