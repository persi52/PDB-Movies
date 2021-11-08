import '../css/reset.css'
import '../css/style.css'
import { signOut } from '../routes/userRoutes';

export function Navbar_logged() {
    return(
        <nav>
        <div className="container">
            <a href="/" className="nav-logo" >PDB Movies</a>
            <div className="nav-links">
                <a href="/search">Szukaj</a>
                <a href="/polecanie">Polecanie</a>
                <a href="/favourities">Ulubione</a>
                <a href="/notifications">Powiadomienia</a>
                <a href="/myprofile">Mój profil</a>
                <a onClick={signOut} href="/">Wyloguj się</a>
            </div>
        </div>
        </nav>
    );
}
export default Navbar_logged;