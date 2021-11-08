import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Registration, Polecanie, Navigation, Footer,Navbar_logged} from "./components";
import Player from "./components/Player";
import {getCurrentUser} from "./routes/userRoutes"

const api = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true
})

function App() {
  
  const loggedInUser = async () => { 
    try {
    const response = await api.get('/getCurrentUser');
    if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
      console.log('success stuff');
     return true;
    }
    return false;
   } catch (err) {
     console.error(err)
     return false;
   }
   
}

  function log(){ 
    
   if((loggedInUser().then((resp)=>{return resp}))==true)
      return <Navbar_logged/>
    else {console.log("asdad");return <Navigation/>}
  }

  

  return (
    <div className="App">
      <Router>
        {log()}
        <Switch>
          <Route path="/registration" exact component={() => <Registration />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/polecanie/:id" exact component={(props) => <Polecanie {...props}/>} />
          <Route path="/" exact component={() => <Home />} />
          <Route path="/search" exact component={() => <Home />} />
          <Route path="/movie/:id" exact render={(props) => <Player {...props} /> } />
          
        </Switch>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;