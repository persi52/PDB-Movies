import axios from "axios";

const friendsApi = axios.create({
     baseURL: "http://localhost:5000/api/friends",
     withCredentials: true
})

export async function getFriends() { 
    let data = await friendsApi.get(`/get`).then(({data}) => data);    
    console.log(data);
    return data;
}

export async function removeFriend(receiver_id) {
   
    await friendsApi.post('/remove',{     
        receiver_id: receiver_id
     
    }).then(console.log("deleted"));  
}