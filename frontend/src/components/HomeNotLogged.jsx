import '../css/reset.css'
import '../css/style.css'
import '../css/moviebrowser.css'
import '../css/movielistpage.css'
import '../css/home_notlogged.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
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
  }

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
                    <button type="button" className="submit-button">Zarejestruj się</button>
                </div>
            </div>
        </div>
        </section>

    <section className="movie-list-container container">
            <div className="movie-genre-box"> 
              <h2 className="movie-genre-title">Popularne</h2> 
              <div className="horizontal-scroll-box">
              <div className="horizontal-scroll-box">
                        {movies.map(movie => (
                            <div className="movie-item" key={movie.movie_id}>
                              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="movie-cover" alt={movie.title} key={movie.movie_id}/>
                              <div className="image-overlay">
                                <div className="movie-title-overlay">{movie.title}
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