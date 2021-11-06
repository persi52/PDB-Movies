import './App.css';
import axios from 'axios';
import { Component } from 'react';
import {useParams} from "react-router-dom";
//import { use } from '../../backend/routes/auth-route';

const api = axios.create({
  baseURL: "http://localhost:5000/api/users"
})

function Video(){
  //const {id} = useParams();
  return(
    <div>
    <input type="text" name="login" id="login" placeholder="Username" value={this.state.login}></input>
    <br/>
    <input type="text" name="password" id="password" placeholder="Password" value={this.state.password}></input>
    <br/>
    <input type="button" name="log" id="log" value="Log In Here" onClick={()=>App.login(this.state.login,
     this.state.password
      )}></input>
    </div>
  )
}
class App extends Component{
  
  login = async(email,password) => {
    let json = {
      email,
      password
    }
    console.log(json);

   await api.post('/signIn', json).then;

  }

  
  constructor(){
    super();
    this.state = {
      email: 'SeniorBoko@bokos1.ms',
      password: 'bokieeem1'
    };
       
  }
// {this.state.users.map(user => <h2 key={user.user_id}>{user.nickname}</h2>)}
  render(){    
  return (
    <div>
    <input type="text" name="login" id="login" placeholder="Username" value={this.state.email}></input>
    <br/>
    <input type="text" name="password" id="password" placeholder="Password" value={this.state.password}></input>
    <br/>
    <input type="button" name="log" id="log" value="Log In Here" onClick={()=>this.login(this.state.email,
     this.state.password
      )}></input>
    </div>
  );
 }
}

export default App;
