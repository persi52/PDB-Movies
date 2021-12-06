import '../css/reset.css'
import '../css/style.css'
import '../css/profile.css'
import User from "../icons/avatar.png"
import Envelope from "../icons/envelope.png"
import Stats from "../icons/stats.png"
import Star from "../icons/star.png"
import Heart from "../icons/heart.png"
import Users from "../icons/users.png"
import {FaPercent} from "react-icons/fa"
import UserRemove from "../icons/user-remove.png"
import UserAccept from "../icons/user-accept.png"
import {getUserById} from '../routes/userRoutes'
import {useEffect, useState} from 'react'
import axios from 'axios'
import StarRatingStatic from './StarRatingStatic'
import {Link} from 'react-router-dom'
import PieChart from './PieChart'
import { Modal } from './Modal_removeFriend'
import { declineInvitation, acceptInvitation, sendInvitation, removeFriend, areFriends } from '../routes/friendsRoute'
import { getFriendFavourites, getFriendRated } from '../routes/movieRoutes'

const api = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

function Profile({match}) {

      const [user, setUser] = useState([]);
      const [rated, setRated] = useState([]);
      const [favourites, setFavourites] = useState([]);
      const [status, setStatus] = useState([]);
      const [showModal, setShowModal] = useState(false);
   
    const openModal = () => {
        setShowModal(true);
    };

      useEffect(() =>{
        getFriendRated(match.params.id).then(resp=>setRated(resp));
        getFriendFavourites(match.params.id).then(resp=>setFavourites(resp));
        getUserById(match.params.id).then(resp=>{setUser(resp[0])});
        areFriends(match.params.id).then((resp)=>setStatus(resp));
      }, [match.params.id]);
    
      const url = "/movie/";

    function showUserButtons(){

        if(status==="friend"){
            return(
                <div className="user-buttons">
                    <button className="user-button" ><img src={Envelope} className="user-button-img" alt="button"/></button>
                    <button className="user-button" onClick={openModal}><img src={UserRemove} className="user-button-img" alt="button"/></button>
                    {showModal ? <Modal setShowModal={setShowModal} user_id={user.user_id} /> : null}
                </div>
            )
        }
        else if(status==="notFriend"){
            console.log("if "+console.log(status));
            return(
                <div className="user-buttons">
                    <button className="user-button" onClick={()=>{sendInvitation(user.user_id).then((resp)=>{})}}><img src={Users} className="user-button-img" alt="button"/></button>
                </div>
            )
        }else if(status==="invitationWaiting"){
            console.log("if "+console.log(status));
            return(
            <div className="user-buttons">
                <button className="user-button" onClick={()=>{acceptInvitation(user.user_id).then((resp)=>{console.log(resp)})}}><img src={UserAccept} className="user-button-img" alt="button"/></button>
                <button className="user-button" onClick={()=>{declineInvitation(user.user_id)}}><img src={UserRemove} className="user-button-img" alt="button"/></button>
            </div>
            )
        }else{
            console.log("if "+console.log(status));
            return(
            <div className="user-buttons">
                <button className="user-button" onClick={()=>{removeFriend(user.user_id)}}><img src={UserRemove} className="user-button-img" alt="button"/></button>
            </div>
            )
        }
    
    }

    function showFavourites(){
        if(favourites==='Your friend has no favourite movies yet') return favourites
        return(
            favourites.map(movie => (
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
             ))
        )
    }

    function showRated(){
        if(rated==='Your friend has no rated movies yet') return rated
        return(
            rated.map(movie => (
                <a key={movie.movie_id} className="fav-movie-item">
                <Link to={url + `${movie.movie_id}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/${movie.thumbnail}`} className="fav-movie-cover-img" alt={movie.title} key={movie.movie_id}/>
                    <div className="movie-item-section-right">
                    <div className="fav-movie-info">
                        <p className="fav-movie-title">{movie.title}</p>
                        <p className="year-of-production">{movie.year_of_production}</p>
                    </div>
                    <div className="rating">{StarRatingStatic(movie.movie_id)}</div>
                    </div> 
                </Link>
                </a>
             ))
        )
    }

    return(
        <section className="container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={User} alt='user' className="user-avatar-image"/>
                </div>
                <div className="user-section-right">
                    <div className="user-body">
                        <div className="prof-user-name" >{user.nickname}</div>
                        <div className="prof-user-email" >{user.email}</div>
                    </div>
                    {showUserButtons()}
                </div>
            </div>
            
            <div className="statistics-section">
            <div className="statistics-section-item stats-section">
                <div className="header-section">
                    <img src={Stats} alt='stats' className="stats-header-icon"/>
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
                                <img src={Star} alt='star' className="header-icon"/>
                                <h2>Ocenione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showRated()}  
                                </div>
                            </div>
                        
                        <div className="fav-movies-section-box">
                            <div className="section-header">
                                <img src={Heart} alt='heart' className="header-icon"></img>
                                <h2>Ulubione filmy</h2>
                            </div>
                            <div className="fav-movie-list">
                                {showFavourites()}  
                            </div>
                        </div>
                
            </div>

    </section>
        
    );
}
export default Profile;