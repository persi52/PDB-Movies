import '../css/style.css'
import '../css/reset.css'

export function Navigation() {
    return(
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
    );
}
export default Navigation;