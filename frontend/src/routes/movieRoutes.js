import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

  export function getMovie(id){
      var data;
      api.get('/get/'+id).then(resp => {
          //console.log(resp.data);
         data = resp.data;
      })
      return data;
  }