import React from 'react';
import '../css/style.css'
import '../css/reset.css'


export function Home() {
  return (
    <div>

<body>
    <nav>
        <div class="container">
            <a href="/" class="nav-logo" >PDB Movies</a>
            <div class="nav-links">
                <a href="#">Szukaj</a>
                <a href="/login">Zaloguj się</a>
                <a href="/registration">Zarejestruj się</a>
            </div>
        </div>
    </nav>

    <footer>
        <div class="container">
            <p>PDB © 2021</p>
            <div>
                <a>IG</a>
                <a>FB</a>
                <a>Twitter</a>
            </div>
        </div>
        
    </footer>
    
</body>
</div>
  );
}

export default Home;