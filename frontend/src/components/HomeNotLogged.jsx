import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import '../css/home_notlogged.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import PhotoCollage from "../icons/kolaz.png"
import { Swiper, Navigation} from 'swiper';

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
  }

  const url = "movie/";

  Swiper.use([Navigation]);
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 6,
    loop: true,
    freeMode: true,
    loopAdditionalSlides: 5,
    speed: 500,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  
  return (
    <div>

    <section className="home-page-container">
            <div className="container">
                <div className="home-page">
                <div className="photo-collage">
                    <h1>Tylko u nas!</h1>
                    <img src={PhotoCollage} alt="PhotoCollage" width="580px" height="380px"/>
                </div>
                <div className="welcome-text">
                    <p>
                        Dołącz do nas, aby oglądać <br/>najnowsze produkcje.
                    </p>
                    <a href="registration" class="submit-button btn-signup">Zarejestruj się</a>
                </div>
            </div>
        </div>
        </section>

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
    </section>
    </div>
  );
}


export default Home;