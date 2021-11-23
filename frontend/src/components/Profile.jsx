import '../css/reset.css'
import '../css/style.css'
import '../css/profile.css'
import User from "../icons/avatar.png"
import Envelope from "../icons/envelope.png"
import Stats from "../icons/stats.png"
import Star from "../icons/star.png"
import Heart from "../icons/heart.png"
import {FaPercent} from "react-icons/fa"
import UserRemove from "../icons/user-remove.png"
import {getUserById} from '../routes/userRoutes'
import {useEffect, useState} from 'react'
import axios from 'axios'
import StarRating from './StarRating'
import {Link} from 'react-router-dom'
import PieChart from './PieChart'

const api = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

function Profile() {

    // const [user, setUser] = useState([]); 
    
    // useEffect(() =>{
    // getUserById(match.params.id).then(resp=>{setUser(resp[0])});
    // console.log(user);
    // }, []); 


    useEffect(() =>{
        getMovies();
      }, []);
    
      const [movies, setMovies] = useState([]);
     
    
      const getMovies = async () => {
        let data = await api.get('/get_all').then(({data})=> data);
            setMovies(data);
      }
    
      const url = "movie/";



    return(
        <section className="container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={User} className="user-avatar-image"/>
                </div>
                <div className="user-section-right">
                    <div className="user-body">
                        <div className="prof-user-name" >User nickname</div>
                        <div className="prof-user-email" >User email</div>
                    </div>
                    <div className="user-buttons">
                        <button className="user-button"><img src={Envelope} className="user-button-img"/></button>
                        <button className="user-button"><img src={UserRemove} className="user-button-img"/></button>
                    </div>
                </div>
            </div>
            
            <div className="statistics-section">
            <div className="statistics-section-item stats-section">
                <div className="header-section">
                    <img src={Stats} className="stats-header-icon"/>
                    <h2>Statystyki obejrzanych filmów</h2>
                </div>
                <PieChart />
    
            </div>
            <div className="statistics-section-item similarity-section">
                <div className="header-section">
                    <FaPercent className="percent-icon" />
                    <h2>Podobieństwo gustów</h2>
                </div>
            </div>
        
            </div>

            <div className="favourites-section">
            <div className="fav-movies-section-box ">
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
                                        <div className="rating"><StarRating/></div>
                                        </div> 
                                    </Link>
                                    </a>
                                 ))}  
                                </div>
                            </div>
                        
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Heart} className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
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
        
    );
}
export default Profile;