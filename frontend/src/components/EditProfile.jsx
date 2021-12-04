import React, { useEffect, useState } from 'react'
import '../css/reset.css'
import '../css/style.css'
import '../css/edit_profile.css'
import '../css/modal_editUsername.css'
import '../css/modal_editPassword.css'
import UserAvatar from "../icons/avatar.png"
import {getUserById} from '../routes/userRoutes'
import {ModalUsername} from "./Modal_editUsername"
import {ModalPassword} from "./Modal_editPassword"


function EditProfile({match}) {

  const [user, setuser] = useState([]);
  const [userForm, setuserForm] = useState(false);
  const [passwordForm, setpasswordForm] = useState(false)

  const showUserForm = () => {
    setuserForm(prev => !prev);
  }

  const showPasswordForm = () => {
    setpasswordForm(prev => !prev)
  }

  useEffect(() => {
    getUserById(match.params.id).then(resp => {setuser(resp[0])})    
  }, [match.params.id]);

    return (
    <div>

    <section className="landing-page">
        <div className="container">
          <div className="edit-data-container">
            <h1>Edytuj profil</h1>
            <div className="edit-data-box">
              <div className="edit-photo-box">
                  <img src={UserAvatar} className="edit-photo-img"/>
                  <button className="form-element-button">Zmień zdjęcie</button>
                </div>
                <div className="edit-data-elements">
                  <div className="edit-form-element">
                    <div className="form-element-data">
                      <label htmlFor="username">Nazwa użytkownika: </label>
                      <span className="edit-username">{user.nickname}</span>
                    </div>
                    <button className="form-element-button btn" onClick={showUserForm}>Edytuj</button>
                  </div>
                  { userForm ? <ModalUsername /> : null } 
                  <div className="edit-form-element">
                    <div className="form-element-data">
                      <label htmlFor="username">Hasło: </label>
                      <span className="edit-username">********</span>
                    </div>
                    <button className="form-element-button btn" onClick={showPasswordForm}>Edytuj</button>
                  </div>
                  {passwordForm ? <ModalPassword /> : null}
                </div>
            </div>
          </div>
        </div>
    </section>
</div>
  );
}

export default EditProfile;