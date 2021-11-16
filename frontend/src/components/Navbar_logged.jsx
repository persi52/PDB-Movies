import '../css/reset.css'
import '../css/style.css'
import Logo from "../icons/logo.png"
import { signOut } from '../routes/userRoutes';

export function Navbar_logged(user_id) {

    

    return(
        <nav>
        <div className="container">
            <a href="/" className="nav-logo" ><img src={Logo} height="45px" width="45px"/><p className="app-name">PDB Movies</p></a>
            
            <div className="nav-links">
                <a href="/search">Szukaj</a>
                <a href="/polecanie">Polecanie</a>
                <a href="/favourities">Ulubione</a>
                <a href="/notifications">Powiadomienia</a>
                <a href={`/myprofile/${user_id}`} >Mój profil</a>
                <a onClick={signOut} href="/">Wyloguj się</a>
            </div>
        </div>
        </nav>
    );
}
export default Navbar_logged;