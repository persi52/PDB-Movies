import '../css/reset.css'
import '../css/style.css'
import Logo from "../icons/logo.png"

export function Navigation() {
    return(
        <nav>
        <div className="container">
        <a href="/" className="nav-logo" ><img src={Logo} alt="logo" height="45px" width="45px"/><p className="app-name">PDB Movies</p></a>
            
            <div className="nav-links nav-links-a ">
                <a href="/search">Szukaj</a>
                <a href="/login">Zaloguj się</a>
                <a href="/registration">Zarejestruj się</a>
            </div>
        </div>
        </nav>
    );
}
export default Navigation;