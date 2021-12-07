import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Notifications,  Home, Login, Registration, Player, Navigation, Footer,Navbar_logged, HomeNotLogged, UserPage, Favourites, Profile, NoAccess, EditProfile, Search} from "./components";
import RegistrationConfirmation from "./components/RegistrationConfirmation";


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
      this.setState({navbar: Navbar_logged(response.data[0].user_id), home: <Home/>})
    }
   } catch (err) {
     console.error(err)
     this.setState({navbar: <Navigation/>, home: <HomeNotLogged/>})
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
            <Route path="/favourities" exact component={() => <Favourites />} />
            <Route path="/" exact component={() => this.state.home} />            
            <Route path="/editprofile/:id" exact component={(props) => <EditProfile {...props} />} />
            <Route path="/confirmation" exact component={() => <RegistrationConfirmation />} />
            <Route path="/myprofile/:id" exact component={(props) => <UserPage {...props} />} />
            <Route path="/movie/:id" exact render={(props) => <Player {...props} /> } />
            <Route path="/profile/:id" exact render={(props) => <Profile {...props} /> } />
            <Route path="/notifications" exact render={() => <Notifications /> } />
            <Route path="/search" exact render={() => <Search />} />
            
          </Switch>
          <Footer/>
        </Router>
        
      </div>
    );
  }
}

export default App;