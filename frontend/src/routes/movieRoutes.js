import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    withCredentials: true
  })

export async function getMovieById(movie_id){      

      let data = await movieApi.get('/get/'+movie_id).then(({data}) => data);
      return data;
}

export async function getMovies(){
  let data = await movieApi.get('get_all').then(({data})=> data);
  return data;
}