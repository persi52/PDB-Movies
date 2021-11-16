import axios from "axios";

const commentsApi = axios.create({
    baseURL: "http://localhost:5000/api/comments",
    withCredentials: true
})

export async function getComments(movie_id) { 
    let data = await commentsApi.get(`/get/`+movie_id).then(({data}) => data);
    return data;
}