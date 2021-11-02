import {login} from '../routes/routes'
import React from 'react';
import '../css/style.css'
import '../css/reset.css'


export function Login() {
  return (
    <div>

    <nav>
        <div className="container">
            <a href="/" className="nav-logo" >PDB Movies</a>
            <div className="nav-links">
                <a href="/">Szukaj</a>
                <a href="/polecanie">Polecanie</a>
                <a href="/login">Zaloguj się</a>
                <a href="/registration">Zarejestruj się</a>
            </div>
        </div>
    </nav>

    <section className="landing-page">
        <div className="container">
            <div className="registration-box">
                <div className="box-logo">
                    <h1>Zaloguj się</h1>
    
                </div>
                
                    <div className="form-element">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" id="email" name="email"/>
                    </div>
                    <div className="form-element">
                        <label htmlFor="password">Hasło: </label>
                        <input type="password" id="password" name="password"/>
                    </div>

                    <button id='login' className="submit-button" onClick={login}>Zaloguj</button>
                

                <div className="box-info">
                    <div className="box-info-text">
                        <h2>Nie masz jeszcze konta?</h2>
                        <a href="registration">Zarejestruj się</a>
                    </div>
                    <div className="box-info-text">
                        <h2>Nie pamiętasz hasła?</h2>
                        <a href="registration">Przypomnij hasło</a>
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <footer>
        <div className="container">
            <p>PDB © 2021</p>
            <div>
                <a href="https://instagram.com">IG</a>
                <a href="https://facebook.com">FB</a>
                <a href="https://twitter.com">Twitter</a>
            </div>
        </div>
        
    </footer>
</div>
  );
}

export default Login;