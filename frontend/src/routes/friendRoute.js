import axios from "axios";

// const friendsApi = axios.create({
//     baseURL: "http://localhost:5000/api/friends",
//     withCredentials: true
// })

export async function getFriends() { 
    //let data = await friendsApi.get(`/get/`+user_id).then(({data}) => data);
    let data = [{id:1,username: "ktos"},{id:2,username: "ktosinny"}]
    return data;
}