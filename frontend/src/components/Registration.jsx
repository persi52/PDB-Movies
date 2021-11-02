import {signup} from '../routes/routes'
import React from 'react';
import '../css/style.css'
import '../css/reset.css'


export function Registration() {
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
                    <h1>Zarejestruj się</h1>
    
                </div>
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

                    <button type="submit" className="submit-button" onClick={signup}>Zarejestruj</button>

                <div className="box-info-text">
                    <h2>Masz już konto?</h2>
                    <a href="login">Zaloguj się</a>
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

export default Registration;