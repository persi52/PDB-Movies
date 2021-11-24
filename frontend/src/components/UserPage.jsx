import '../css/reset.css'
import '../css/style.css'
import '../css/modal_removeFriend.css'
import '../css/userpage.css'
import User from "../icons/avatar.png"
import User2 from "../icons/avatar2.png"
import Envelope from "../icons/envelope.png"
import Pencil from "../icons/pencil.png"
import Stats from "../icons/stats.png"
import UserRemove from "../icons/user-remove.png"
import Users from "../icons/users.png"
import {getUserById} from '../routes/userRoutes'
import {useEffect, useState} from 'react'
import * as friendsApi from '../routes/friendsRoute'
import PieChart from './PieChart'
import { Modal } from "./Modal_removeFriend";
import { useAlert } from 'react-alert'



function UserPage({match}) {

    const [user, setUser] = useState([]);
    const [friends,setFriends] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    //const alert = useAlert();
   
    const openModal = () => {
        setShowModal(true);
    };


    useEffect(() =>{
    getUserById(match.params.id).then(resp=>{setUser(resp[0])});
    }, [match.params.id]); 

    useEffect(() =>{
        friendsApi.getFriends().then((resp)=>{setFriends(resp)});
        console.log(friends);
    }, []);

    function showFriends(){
        if(friends!="You got no friends che che"){
            return(friends.map(friend => (
                <div key={friend.user_id} className="friends-list-item">
                    <div className="friend-avatar">
                        <img className="friend-avatar-img" src={User2}/>
                    </div>
                    <div className="friend-name">{friend.nickname}</div>
                    <div className="friends-list-buttons">
                        <button className="friends-list-button"><img src={Envelope} className="friends-list-button-img"/></button>
                        <button className="friends-list-button"><img src={UserRemove} className="friends-list-button-img"
                        onClick={openModal}/></button>
                        {showModal ? <Modal setShowModal={setShowModal} user_id={friend.user_id} /> : null}
                    </div>
                </div>   
            
            )))}
    }

    return(
        <section className="landing-page">
        <div className="container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={User} className="user-avatar-image"/>
                </div>
                <div className="user-section-right">
                    <div className="user-body">
                        <div className="user-name" id="user-name">{user.nickname}</div>
                        <div className="user-email" id="user-email">{user.email}</div>
                    </div>
                    <div className="edit-user-info">
                        <a href="/editprofile">
                            <img src={Pencil} className="edit-user-info-image"/>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="friends-and-stats-section">
                <div className="friends-section">
                    <div className="header-section">
                        <img src={Users} className="header-icon"/>
                        <h2>Lista znajomych</h2>
                    </div>
                    <div className="friends-list">                                                           
                        {showFriends()}                        
                    </div>
                </div>
                <div className="stats-section">
                    <div className="header-section">
                        <img src={Stats} alt="stats" className="header-icon"/>
                        <h2>Statystyki obejrzanych filmów</h2>
                    </div>
                    <div className="pie-chart">                        
                     <PieChart/>
                    </div>
        
                </div>
        
            </div>

        </div>
    </section>
        
    );
}
export default UserPage;