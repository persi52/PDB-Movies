import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/no_access.css'
import { getMovies, getGenres } from '../routes/movieRoutes';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getUsers } from '../routes/userRoutes';


export function Search() {

    const urlMovie = "movie/";
    const urlUser = "profile/";

    useEffect(() =>{
        getMovies().then((resp)=>{setMovies(resp); console.log(resp) }); 
        getUsers().then((resp)=>{setUsers(resp); console.log(resp)}); 
        getGenres().then((resp) =>{setGenres(resp); console.log(resp)})
      }, []);
    
      const [movies, setMovies] = useState([]);
      const [users, setUsers] = useState([]);
      const [genres, setGenres] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

  return (
    
    <div className="container">        
        <input type="text" placeholder="Szukaj..." onChange={event => {setSearchTerm(event.target.value)}}/>
        <h1 style={{"font-size": "xx-large"}}>Filmy</h1>
        {movies.filter((val) => {
            if(searchTerm == ""){
                return val
            } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())
            || genres.filter((obj) => {
                
                if(val.genre_id.find(element => element==obj.genre_id))
                {
                    //console.log(obj.name)
                    return obj;
                }
            }).some(x => x.name.toLowerCase().includes(searchTerm.toLowerCase())))           
            
            {               
            
                  ///zeby sie przefiltrowaly to to musi w jakis sposob zwrocic true
                
                return val
            }
            
            
        }).map((val,key) => {
            return <Link to={urlMovie + `${val.movie_id}`}><p>{val.title}</p></Link>
        })}
        <br></br>
        <h1 style={{"font-size": "xx-large"}}>Użytkownicy</h1>
        {users.filter((val) => {
            if(searchTerm == ""){
                return val
            } else if(val.nickname.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
        }).map((val,key) => {
            return <Link to={urlUser + `${val.user_id}`}><p>{val.nickname}</p></Link>
        })}
        
    </div>
            
   
    
  );
}

export default Search;