import React, { useRef } from "react";
import ReactDom from "react-dom";
import {useEffect, useState} from 'react'
import { getUsers } from "../routes/userRoutes";
import { recommend } from '../routes/userRoutes';
import { useAlert } from 'react-alert'

export const Modal = ({ setShowModal, movieId }) => {
 
  const [users,setUsers] = useState([]); 
  const alert = useAlert();

  useEffect(() =>{
  getUsers().then(resp=>{setUsers(resp.data)});
  }, []);

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
          <h2 className="modal-header">Poleć film znajomym:</h2>
          <div className="modal-list">
          {users.map(user => 
          <div className="user-list-item">
            <h2 className="user-list-name" key={user.user_id}>{user.nickname}</h2>
              <button onClick={()=>{
                recommend(user.user_id,movieId);
                alert.show("Polecono film!")}}>Poleć</button>
                </div>
            
          )}
          </div>
          
          
      </div>
    </div>,
    document.getElementById("portal")
  );
};