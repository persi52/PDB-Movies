import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:5000/api/users",
    withCredentials: true
  })

const recommendApi = axios.create({
  baseURL: "http://localhost:5000/api/recommend",
  withCredentials: true
})

  export function getUsers(){
    userApi.get('/getUsers').then(resp => {
  
      console.log(resp.data);
     
  });
  }

  export function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    userApi.post('/signIn',{   
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
  
    userApi.post('/signUp',{ 
        nickname: username,  
        email: email,
        password: password,
        repeatPassword: repeatpassword
    }).then(
  
      console.log("Dodano użytkownika "+username)
  );
  }

  export function recommend(receiver_id, movie_id){
    recommendApi.post('/',{ 
        receiver_id: receiver_id,  
        movie_id: movie_id
    }).then(
  
      console.log("Polecono "+movie_id+" dla "+receiver_id)
  );
  }