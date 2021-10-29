import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api/users"
  })
  
  function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    api.post('/signIn',{   
        email: email,
        password: password
    }).then(resp => {
  
      console.log(resp.data);
  });
  }

function ClearFields() {

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table>
          <tbody>
          <tr>
            <td>Email:</td> 
            <td><input id='email' type="text"></input></td>
          </tr>
          <tr>
            <td>Hasło:</td> 
            <td><input id='password' type='password'></input></td>
          </tr>
          <tr>
            <td colSpan="2"><button id="login" onClick={login} >ZALOGUJ</button> <button onClick={ClearFields}>WYCZYŚĆ</button></td>
          </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;