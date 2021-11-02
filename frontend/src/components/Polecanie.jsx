import '../css/style.css'
import '../css/reset.css'
import axios from 'axios';
import { Component } from 'react';

const api = axios.create({
    baseURL: "http://localhost:5000/api/users"
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
        let data = await api.get(`/getUsers/${id}`);
        this.getUsers();
    }
    
render(){
  return (
    <div>

    <nav>
        <div className="container">
            <a href="/" className="nav-logo" >PDB Movies</a>
            <div className="nav-links">
                <a href="/">Szukaj</a>
                <a href="/polecanie">Polecanie</a>
                <a href="/login">Zaloguj się</a>
                <a href="/registration">Zarejestruj się</a>
            </div>
        </div>
    </nav>

    <section className="landing-page">
        <div className="container">
           
           {this.state.users.map(user => <h2 key={user.user_id}>{user.nickname}<button className="submit-button" onClick={()=>this.getUser(user.user_id)}>Poleć</button></h2>)}
             
                   
        </div>
    </section>

    <footer>
        <div className="container">
            <p>PDB © 2021</p>
            <div>
                <a href="https://instagram.com">IG</a>
                <a href="https://facebook.com">FB</a>
                <a href="https://twitter.com">Twitter</a>
            </div>
        </div>
        
    </footer>
</div>
  );
}
}
export default Polecanie;