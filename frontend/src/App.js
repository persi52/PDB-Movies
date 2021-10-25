import './App.css';
import axios from 'axios';
import { Component } from 'react';
import {useParams} from "react-router-dom";
//import { use } from '../../backend/routes/auth-route';

const api = axios.create({
  baseURL: "http://localhost:5000/api/movies/movies"
})

function Video(){

  //const {id} = useParams();
  return(
    <video id="videoPlayer" width="650" controls muted="muted" autoplay src={`http://localhost:5000/api/movies/3`} type="video/mp4">
    </video>
  )
}
class App extends Component{
  
  state = {
    users: []
  }
  constructor(){
    super();
   
    api.get('').then(res => {
      console.log(res.data);
      this.setState({ users: res.data})
    })
  }
// {this.state.users.map(user => <h2 key={user.user_id}>{user.nickname}</h2>)}
  render(){    
  return (
    <div className="App">
      <header className="App-header">
        <Video/>
     
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
 }
}

export default App;
