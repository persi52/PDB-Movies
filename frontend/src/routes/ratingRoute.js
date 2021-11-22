import axios from "axios";

const ratingApi = axios.create({
    baseURL: "http://localhost:5000/api/ratings",
    withCredentials: true
})

export async function getRatingsByMovieId(movie_id){      

    let data = await ratingApi.get('/get/'+movie_id).then(({data}) => data);
    return data;
}

export async function addRating(rate, movie_id){
    ratingApi.post('/add',{ 
        rate: rate,  
        movie_id: movie_id
    })
}

export async function getUserRate(movie_id){
    let data = await ratingApi.post('/getUserRate',{movie_id:movie_id}).then(({data})=>data);
    console.log(data)
    return data;
}
