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
  let data = userApi.get('/getUsers');
  return data;
}

export function signOut(){
  userApi.delete('/signOut');
}

export function getUserById(user_id){
  let data = userApi.get('getUserById/' + user_id).then(({data}) => data);
  return data;
}

  export function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    userApi.post('/signIn',{   
        email: email,
        password: password
    }).then(resp => {
      window.location.href="/";
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
    }).then(resp => {
      window.location.href="/confirmation";
  });
  
  }

  export function recommend(receiver_id, movie_id){
    recommendApi.post('/',{ 
        receiver_id: receiver_id,  
        movie_id: movie_id
    });
  }