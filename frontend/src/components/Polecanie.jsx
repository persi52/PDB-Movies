import '../css/reset.css'
import '../css/style.css'
import axios from 'axios';
import { Component } from 'react';

const api = axios.create({
    baseURL: "http://localhost:5000/api/users",
    withCredentials: true
})

export class Polecanie extends Component {
   
    state = {
        users: []
    }

    constructor(){
        super();
        this.getUsers();
    }

    getUsers = async () => {
        let data = await api.get('/getUsers').then(({data})=> data);
            this.setState({users: data})
        
    }

    getUser = async (id)=>{
        await api.get(`/${id}`);
        this.getUsers();
    }
    
render(){
  return (
    <div>

    <section className="landing-page">
        <div className="container">  
           {this.state.users.map(user => <h2 key={user.user_id}>{user.nickname}<button className="submit-button" onClick={()=>this.getUser(user.user_id)}>Poleć</button></h2>)}           
        </div>
    </section>        
    </div>
  );
}
}
export default Polecanie;