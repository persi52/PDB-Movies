import axios from "axios";

const commentsApi = axios.create({
    baseURL: "http://localhost:5000/api/comments",
    withCredentials: true
})

export async function getComments(movie_id) { 
    let data = await commentsApi.get(`/get/`+movie_id).then(({data}) => data);
    return data;
}

export async function getCommentLikes(comment_id) {
    let data = await commentsApi.get(`/getCommentLikes/`+comment_id).then(({data})=>data);
    return data;
}

export async function addCommentLike(isPositive,comment_id){
    let data = await commentsApi.post('/addCommentLike',{
        isPositive: isPositive,
        comment_id: comment_id,
    }).then((data)=>data)
    return data;
}

export async function deleteCommentLike(comment_id){
    let data = await commentsApi.delete(`/deleteCommentLike/${comment_id}`).then((data)=>data);
    return data;
}

export async function getUserCommentLike(comment_id){
    let data = await commentsApi.get(`/getUserCommentLike/${comment_id}`).then((data)=>data);
    return data;
}