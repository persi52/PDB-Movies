import '../css/reset.css'
import '../css/style.css'
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

function UserPage({match}) {

    const [user, setUser] = useState([]); 
    
    useEffect(() =>{
    getUserById(match.params.id).then(resp=>{setUser(resp[0])});
    console.log(user);
    }, []); 

    return(
        <section class="landing-page">
        <div class="container">
            <div class="user-info">
                <div class="user-avatar">
                    <img src={User} class="user-avatar-image"/>
                </div>
                <div class="user-section-right">
                    <div class="user-body">
                        <div class="user-name" id="user-name">{user.nickname}</div>
                        <div class="user-email" id="user-email">{user.email}</div>
                    </div>
                    <div class="edit-user-info">
                        <a href="edit.html">
                            <img src={Pencil} class="edit-user-info-image"/>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="friends-and-stats-section">
                <div class="friends-section">
                    <div class="header-section">
                        <img src={Users} class="header-icon"/>
                        <h2>Lista znajomych</h2>
                    </div>
                    <div class="friends-list">
                        <div class="friends-list-item">
                            <div class="friend-avatar">
                                <img class="friend-avatar-img" src={User2}/>
                            </div>
                            <div class="friend-name">ziomeczek</div>
                            <div class="friends-list-buttons">
                                <button class="friends-list-button"><img src={Envelope} class="friends-list-button-img"/></button>
                                <button class="friends-list-button"><img src={UserRemove} class="friends-list-button-img"/></button>
                            </div>
                        </div>                        
                        <div class="friends-list-item">
                            <div class="friend-avatar">
                                <img class="friend-avatar-img" src={User2}/>
                            </div>
                            <div class="friend-name">ziomeczek</div>
                            <div class="friends-list-buttons">
                                <button class="friends-list-button"><img src={Envelope} class="friends-list-button-img"/></button>
                                <button class="friends-list-button"><img src={UserRemove} class="friends-list-button-img"/></button>
                            </div>
                        </div>
                        
        
                    </div>
                </div>
                <div class="stats-section">
                    <div class="header-section">
                        <img src={Stats} class="header-icon"/>
                        <h2>Statystyki obejrzanych filmów</h2>
                    </div>
        
                </div>
        
            </div>

        </div>
    </section>
        
    );
}
export default UserPage;