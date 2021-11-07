import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/users",
    withCredentials: true
  })

  export function getUsers(){
    api.get('/getUsers').then(resp => {
  
      console.log(resp.data);
     
  });
  }

  export function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    api.post('/signIn',{   
        email: email,
        password: password
    }).then(resp => {
    
      
      //console.log(resp.data);
  });
  }

  export function signup(){
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatpassword = document.getElementById("repeatpassword").value;
  
    api.post('/signUp',{ 
        nickname: username,  
        email: email,
        password: password,
        repeatPassword: repeatpassword
    }).then(
  
      console.log("Dodano użytkownika "+username)
  );
  }