import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/search.css'
import { getMovies, getGenres } from '../routes/movieRoutes';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getUsers } from '../routes/userRoutes';


export function Search() {

    const url = "movie/";

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
    <div className="landing-page">
        <div className="container"> 
            <div className="search-container">
                <div className="search-field">
                    <label htmlFor="search" className="search-label">Wyszukaj film lub użytkownika:</label>  
                    <input type="text" className="search-input" id="search" placeholder="Szukaj..." onChange={event => {setSearchTerm(event.target.value)}}/>
                </div>

                <div className="search-box">                    
                    <div className="search-movie-box">
                    <h1 className="search-section-title">Filmy</h1>
                    <div>
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
                            return <p>{val.title}</p>
                        })
                        }
                    </div>
                    </div>

                    <div className="search-movie-box">
                    
                        <h1 className="search-section-title">Użytkownicy</h1>
                        {users.filter((val) => {
                            if(searchTerm == ""){
                                return val
                            } else if(val.nickname.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).map((val,key) => {
                            return <p>{val.nickname}</p>
                        })}
                    </div>
                </div>

                
            </div>               
        </div>
      </div>
    
    
            
   
    
  );
}

export default Search;