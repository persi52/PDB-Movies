import '../css/reset.css'
import '../css/style.css'
import '../css/footer.css'


export function Footer() {
    return(
        <footer>
        <div className="footer">
            <p>PDB © 2021</p>
            <div className="footer-links">
                <a href="https://instagram.com">IG</a>
                <a href="https://facebook.com">FB</a>
                <a href="https://twitter.com">Twitter</a>
            </div>
        </div>
        </footer>
    );
}
export default Footer;