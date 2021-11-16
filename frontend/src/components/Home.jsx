import '../css/reset.css'
import '../css/style.css'
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
      <section className="landing-page">
        <div className="container">
          {/* {this.state.movies.map(movie => 
            <a key={movie.movie_id} href={this.url+movie.movie_id}>
              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} alt={movie.title} key={movie.movie_id}/>
              
            </a>
          )}
           */}
           {movies.map(movie => (
             <a key={movie.movie_id}>
               <Link to={url + `${movie.movie_id}`}><img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} alt={movie.title} key={movie.movie_id}/></Link>
               </a>
           ))}
        </div>
      </section>
    </div>
  );
}


export default Home;