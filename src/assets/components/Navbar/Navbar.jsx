import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return(
        <div className='navbar'>
            <div className='navTitle'>MyAnimeList</div>
            <div className='navPages'>
                <Link to="/" className='linkPage'><div>Top Anime</div></Link>
                <Link to="/manga" className='linkPage'><div>Top Manga</div></Link>
                <Link to="/characters" className='linkPage'><div>Top Characters</div></Link>
            </div>
        </div>
    )
}