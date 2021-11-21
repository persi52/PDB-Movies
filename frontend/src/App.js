import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Registration, Polecanie,Player, Navigation, Footer,Navbar_logged, Home_notLogged, UserPage, Favourites, Profile} from "./components";


const api = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true
})

class App extends Component {

  state = {
    navbar: Navbar_logged(),
    home: <Home></Home>
  }

  constructor(){
    super();
    this.loggedInUser();
}

  loggedInUser = async () => { 
    try {
    const response = await api.get('/getCurrentUser');
    if (response.status === 200) {
      console.log(response);
      this.setState({navbar: Navbar_logged(response.data[0].user_id), home: <Home/>})
    }
   } catch (err) {
     console.error(err)
     this.setState({navbar: <Navigation/>, home: <Home_notLogged/>})
   }
}
  
  render(){
    return (
      <div className="App">
        <Router>
          {this.state.navbar}
          <Switch>
            <Route path="/registration" exact component={() => <Registration />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/favourites" exact component={() => <Favourites />} />
            <Route path="/polecanie/:id" exact component={(props) => <Polecanie {...props}/>} />
            <Route path="/" exact component={() => this.state.home} />
            <Route path="/search" exact component={() => <Profile />} />
            <Route path="/myprofile/:id" exact component={(props) => <UserPage {...props} />} />
            <Route path="/movie/:id" exact render={(props) => <Player {...props} /> } />
            
          </Switch>
          <Footer/>
        </Router>
        
      </div>
    );
  }
}

export default App;