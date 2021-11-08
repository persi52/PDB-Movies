import '../css/reset.css'
import '../css/style.css'
import axios from 'axios';
import { Component } from 'react';
import { recommend } from '../routes/userRoutes';

const api = axios.create({
    baseURL: "http://localhost:5000/api/users/getUsers",
    withCredentials: true
})

export class Polecanie extends Component {

    state = {
        users: []
    }

    constructor(){
        super();
        api.get('/').then(res => {
            console.log(res.data);
            this.setState({users: res.data})
        })
    }
    
render(){
  return (
    <div>

    <section className="landing-page">
        <div className="container">  

            {this.state.users.map(user => 
                <h2 key={user.user_id}>{user.nickname}
                    <button onClick={()=>recommend(user.user_id,this.props.match.params.id)}>Polec</button>
                </h2>
                
            )}

        </div>
    </section>        
    </div>
  );
}
}
export default Polecanie;