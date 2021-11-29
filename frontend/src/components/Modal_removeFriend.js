import React, { useRef } from "react";
import ReactDom from "react-dom";
import { useAlert } from 'react-alert'
import * as friendsApi from '../routes/friendsRoute'

export const Modal = ({ setShowModal, user_id}) => {
  
  const alert = useAlert();

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  function removeFromFriends(user_id){
    friendsApi.removeFriend(user_id);
    setShowModal(false);
    alert.show("Usunięto znajomego")
    window.location.reload(false);
}
  
  return ReactDom.createPortal(
    <div className="container-remove-friend" ref={modalRef} onClick={closeModal}>
      <div className="modal-remove-friend">
          <h2 className="modal-header">Na pewno chcesz usunąć znajomego?</h2>
          <button onClick={()=>{removeFromFriends(user_id)}}>Usuń</button>
          <button onClick={()=>{setShowModal(false)}}>Anuluj</button>
          
      </div>
    </div>,
    document.getElementById("portal")
  );
};