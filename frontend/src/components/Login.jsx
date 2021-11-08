import {login} from '../routes/userRoutes'
import React from 'react';
import '../css/reset.css'
import '../css/style.css'


export function Login() {
  return (
    <div>

    <section className="landing-page">
        <div className="container">
            <div className="login-box">
                <div className="box-logo">
                    <h1>Zaloguj się</h1>
                </div>
                
                <div className="registration-form">
                    <div className="form-element">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email"/>
                    </div>
                        
                    <div className="form-element">
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="password"/>
                    </div>
                </div>


                <button id='login' className="submit-button" onClick={login}>Zaloguj</button>
                
                <div className="box-info">
                    <div className="box-info-text box-info-text-login">
                        <h2>Nie masz jeszcze konta?</h2>
                        <a href="registration">Zarejestruj się</a>
                    </div>
                    <div className="box-info-text box-info-text-login">
                        <h2>Nie pamiętasz hasła?</h2>
                        <a href="registration">Przypomnij hasło</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
  );
}

export default Login;