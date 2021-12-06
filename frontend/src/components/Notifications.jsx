import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import {getNotifications} from '../routes/notificationsRoute'
import { acceptInvitation, declineInvitation } from '../routes/friendsRoute';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

export function Notifications(){

  const profileUrl = "/profile/";
  const movieUrl = "/movie/";
    const [notifications, setNotifications] = useState([]);

      useEffect(() =>{
        getNotifications().then(resp=>{setNotifications(resp)})
      }, []);

      function showAllnotifications(){
          if(notifications==='No notifications') return notifications
          return(notifications.map(notification=>(
            <div>
                {showNotification(notification)}
            </div>
        )))
      }

    const showNotification = (notification) => {
        if(notification.type==='friendRequest') {
          return( 
            <div>
              <p>Zaproszenie do grona znajomych od uzytkownika  <Link to={profileUrl + `${notification.sender_id}`} style={{textDecoration:"none"}}>{notification.nickname}</Link></p>
              {notification.sender_profile_picture}
              <button onClick={()=>acceptInvitation(notification.sender_id)}>Przyjmij</button><button onClick={()=>declineInvitation(notification.sender_id)}>Odrzuć</button>
            </div>
             
          )}
        else if(notification.type==='recommendation'){
        return(
          <div>
            <p>Uzytkownik <Link to={profileUrl + `${notification.sender_id}`} style={{textDecoration:"none"}}>{notification.nickname}</Link>
             poleca Ci film <Link to={movieUrl + `${notification.movie_id}`} style={{textDecoration:"none"}}>{notification.movie_title}
             <img src={`${process.env.PUBLIC_URL}/images/${notification.movie_thumbnail}`}/></Link></p>
            
          </div>
        )}
    }
    return(
        <div>
            {showAllnotifications()}
        </div>
    )
}

export default Notifications;