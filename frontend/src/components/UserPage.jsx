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
    }, [match.params.id]); 

    return(
        <section class="landing-page">
        <div className="container">
            <div className="user-info">
                <div className="user-avatar">
                    <img src={User} alt="avatar" className="user-avatar-image"/>
                </div>
                <div className="user-section-right">
                    <div className="user-body">
                        <div className="user-name" id="user-name">{user.nickname}</div>
                        <div className="user-email" id="user-email">{user.email}</div>
                    </div>
                    <div className="edit-user-info">
                        <a href="edit.html">
                            <img src={Pencil} alt="edit" className="edit-user-info-image"/>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="friends-and-stats-section">
                <div className="friends-section">
                    <div className="header-section">
                        <img src={Users} alt="users" class="header-icon"/>
                        <h2>Lista znajomych</h2>
                    </div>
                    <div className="friends-list">
                        <div className="friends-list-item">
                            <div className="friend-avatar">
                                <img className="friend-avatar-img" alt="avatar" src={User2}/>
                            </div>
                            <div className="friend-name">ziomeczek</div>
                            <div className="friends-list-buttons">
                                <button className="friends-list-button"><img src={Envelope} alt="envelope" class="friends-list-button-img"/></button>
                                <button className="friends-list-button"><img src={UserRemove} alt="remove" class="friends-list-button-img"/></button>
                            </div>
                        </div>                        
                        <div className="friends-list-item">
                            <div className="friend-avatar">
                                <img className="friend-avatar-img" alt="friend" src={User2}/>
                            </div>
                            <div className="friend-name">ziomeczek</div>
                            <div className="friends-list-buttons">
                                <button className="friends-list-button"><img src={Envelope} alt="envelope" class="friends-list-button-img"/></button>
                                <button className="friends-list-button"><img src={UserRemove} alt="remove" class="friends-list-button-img"/></button>
                            </div>
                        </div>
                        
        
                    </div>
                </div>
                <div className="stats-section">
                    <div className="header-section">
                        <img src={Stats} alt="stats" className="header-icon"/>
                        <h2>Statystyki obejrzanych filmów</h2>
                    </div>
        
                </div>
        
            </div>

        </div>
    </section>
        
    );
}
export default UserPage;