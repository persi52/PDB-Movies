import {signup} from '../routes/userRoutes'
import React from 'react';
import '../css/reset.css'
import '../css/style.css'



export function Registration() {
  return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="registration-box">
                <div className="box-logo">
                    <h1>Zarejestruj się</h1>
                </div>

                <div className="registration-form">
                    <div className="form-element">
                        <label htmlFor="username">Nazwa użytkownika: </label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email"/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="repeatpassword">Powtórz hasło: </label>
                        <input type="password" id="repeatpassword" name="repeatpassword"/>
                    </div>
                </div>    


                    <button type="submit" className="submit-button" onClick={signup}>Zarejestruj</button>

                <div className="box-info">       
                    <div className="box-info-text">
                        <h2>Masz już konto?</h2>
                        <a href="login">Zaloguj się</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  );
}

export default Registration;