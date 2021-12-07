import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import '../css/no_access.css'
import { getMovies } from '../routes/movieRoutes';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getUsers } from '../routes/userRoutes';


export function Search() {

    const url = "movie/";

    useEffect(() =>{
        getMovies().then((resp)=>{setMovies(resp)}); 
        getUsers().then((resp)=>{setUsers(resp)});      
      }, []);
    
      const [movies, setMovies] = useState([]);
      const [users, setUsers] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');

  return (
    
    <div className="container">        
        <input type="text" placeholder="Szukaj..." onChange={event => {setSearchTerm(event.target.value)}}/>
      
        {movies.filter((val) => {
            if(searchTerm == ""){
                return val
            } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
        }).map((val,key) => {
            return <p>{val.title}</p>
        })}

        {/* {users.filter((val) => {
            if(searchTerm == ""){
                return val
            } else if(val.nickname.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
            }
        }).map((val,key) => {
            return <p>{val.nickname}</p>
        })} */}
        
    </div>
            
   
    
  );
}

export default Search;