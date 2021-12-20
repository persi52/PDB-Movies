import '../css/reset.css'
import '../css/style.css'
import '../css/modal_removeFriend.css'
import '../css/userpage.css'
import Envelope from "../icons/envelope.png"
import Pencil from "../icons/pencil.png"
import Stats from "../icons/stats.png"
import UserRemove from "../icons/user-remove.png"
import Users from "../icons/users.png"
import {getCurrentUser} from '../routes/userRoutes'
import React from 'react'
import * as friendsApi from '../routes/friendsRoute'
import PieChart from './PieChart'
import { Modal } from "./Modal_removeFriend";
import {Link} from 'react-router-dom'

const profileUrl = "/profile/";

class UserPage extends React.Component {

    profileUrl = "/profile/";

    state = {
        user: [],
        friends: [],
        showModal: false,
    }
    
    constructor(){
        super();
        friendsApi.getFriends().then((resp)=>this.setState({friends: resp}));
        getCurrentUser().then((resp)=>{this.setState({user: resp})});
        this.setShowModal = this.setShowModal.bind(this)
    }
   
    openModal = () => {
        this.setState({showModal: true});
    };

    setShowModal(show){
        console.log(show)
        this.setState({showModal: show})
    }

    showFriends(){
        if(this.state.friends!=="You got no friends"){
            return(this.state.friends.map(friend => (
                <div key={friend.user_id} className="friends-list-item">
                    <Link to={profileUrl + `${friend.user_id}`} style={{textDecoration:"none"}}><div className="friend-list-data">
                        <div className="friend-avatar">
                            <img className="friend-avatar-img" alt='user' src={`${process.env.PUBLIC_URL}/photos/${friend.profile_picture}`}/>
                        </div>
                        <div className="friend-name">{friend.nickname}</div>
                    </div></Link>
                    
                    <div className="friends-list-buttons">
                        <button className="friends-list-button"><img src={Envelope} alt='envelope' className="friends-list-button-img"/></button>
                        <button className="friends-list-button"><img src={UserRemove} alt='userremove' className="friends-list-button-img"
                        onClick={this.openModal}/></button>
                        {this.state.showModal ? <Modal setShowModal={this.setShowModal} user_id={friend.user_id} /> : null}
                    </div>
                </div>   
            
            )))}else return(
                <div className="no-friends-box">
                    <div className="no-friends-info">
                        Nie masz jeszcze żadnych znajomych.
                    </div>
                </div>
            )
    }
    render(){
    return(
        <section className="landing-page">
        <div className="container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={`${process.env.PUBLIC_URL}/photos/${this.state.user.profile_picture}`} alt='avatar' className="user-avatar-image"/>
                </div>
                <div className="user-section-right">
                    <div className="user-body">
                        <div className="user-name" id="user-name">{this.state.user.nickname}</div>
                        <div className="user-email" id="user-email">{this.state.user.email}</div>
                    </div>
                    <div className="edit-user-info">
                        <a href={`/editprofile`}>
                            <img src={Pencil} alt='pencil' className="edit-user-info-image"/>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="friends-and-stats-section">
                <div className="friends-section">
                    <div className="header-section">
                        <img src={Users} alt='users' className="header-icon"/>
                        <h2>Lista znajomych</h2>
                    </div>
                    <div className="friends-list">                                                           
                        {this.showFriends()}                        
                    </div>
                </div>
                <div className="stats-section">
                    <div className="header-section">
                        <img src={Stats} alt="stats" className="header-icon"/>
                        <h2>Statystyki obejrzanych filmów</h2>
                    </div>
                    <div className="pie-chart">                        
                     {<PieChart user_id = {0}/>}
                    </div>
        
                </div>
        
            </div>

        </div>
    </section>
        
    )};
}
export default UserPage;