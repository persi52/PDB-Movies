import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getMovies } from '../routes/movieRoutes';
import { Swiper, Navigation} from 'swiper';
import { getMoviesByGenre } from '../routes/movieRoutes'

function Home() {

  useEffect(() =>{
    getMovies().then((resp)=>{setMovies(resp)});
    getMoviesByGenre(1).then((resp)=>{setDramas(resp)});
    getMoviesByGenre(4).then((resp)=>{setActions(resp)});
    getMoviesByGenre(3).then((resp)=>{setAdventures(resp)});
  }, []);

  const [movies, setMovies] = useState([]);
  const [dramas, setDramas] = useState([]);
  const [actions, setActions] = useState([]);
  const [adventures, setAdventures] = useState([]);

  const url = "movie/";

  Swiper.use([Navigation]);
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 6,
    loop: true,
    freeMode: true,
    //loopAdditionalSlides: 5,
    speed: 500,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });
  
  return (
    <div>
    <section className="movie-list-container container">
          
            <div className="movie-genre-box">
                <h2 className="main-movie-genre-title">Nowości</h2> 
                <div class="swiper">
                    <div class="swiper-wrapper">
                    {movies.map(movie => (
                      <div class="swiper-slide">
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
                          </div>
                      ))} 
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                  </div>
            </div> 

            <div className="movie-genre-box">
                <h2 className="main-movie-genre-title">Dramaty</h2> 
                <div class="swiper">
                    <div class="swiper-wrapper">
                    {dramas.map(movie => (
                      <div class="swiper-slide">
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
                          </div>
                      ))} 
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                  </div>
            </div> 

            <div className="movie-genre-box">
                <h2 className="main-movie-genre-title">Akcja</h2> 
                <div class="swiper">
                    <div class="swiper-wrapper">
                    {actions.map(movie => (
                      <div class="swiper-slide">
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
                          </div>
                      ))} 
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                  </div>
                  
                  <div className="movie-genre-box">
                <h2 className="main-movie-genre-title">Przygodowe</h2> 
                <div class="swiper">
                    <div class="swiper-wrapper">
                    {adventures.map(movie => (
                      <div class="swiper-slide">
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
                          </div>
                      ))} 
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                  </div>
            </div>

            </div> 

    </section>
    </div>
  );
}


export default Home;