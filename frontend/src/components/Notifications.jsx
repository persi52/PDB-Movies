import React from 'react';
import '../css/reset.css'
import '../css/style.css'
import {getNotifications} from '../routes/notificationsRoute'
import { useState, useEffect } from 'react';
import { getUserById } from '../routes/userRoutes';

export function Notifications(){

    const [notifications, setNotifications] = useState([]);

      useEffect(() =>{
        getNotifications().then(resp=>{setNotifications(resp)})
      }, []);

    const showNotification = (notification) => {
        if(notification.type==='friendRequest') { return notification.type}
        else if(notification.type==='recommendation')return notification.type
    }
    return(
        <div>
            {notifications.map(notification=>(
                <div>
                    {showNotification(notification)}
                </div>
            ))}
        </div>
    )
}

export default Notifications;