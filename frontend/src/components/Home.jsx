import '../css/reset.css'
import '../css/style.css'
import axios from 'axios';
import { Component } from 'react';

const api = axios.create({
  baseURL: "http://localhost:5000/api/movies",
  withCredentials: true
})

export class Home extends Component {

  state = {
    movies: []
  }

  constructor(){
    super();
    this.getMovies();
}

  getMovies = async () => {
    let data = await api.get('/get_all').then(({data})=> data);
        this.setState({movies: data})
    
  }

  url = "http://localhost:3000/movie/";

  render(){
  return (

    <div>
      <section className="landing-page">
        <div className="container">

          {this.state.movies.map(movie => 
            <a key={movie.movie_id} href={this.url+movie.movie_id}>
              <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} alt={movie.title} key={movie.movie_id}/>
              
            </a>
          )}
          
        </div>
      </section>
    </div>
  );
  }
}

export default Home;