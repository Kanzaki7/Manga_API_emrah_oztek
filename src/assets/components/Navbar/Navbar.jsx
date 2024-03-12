import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo1 from '../../../assets/logoPink1.png'
import logo2 from '../../../assets/logoPink2.png'
import logo3 from '../../../assets/logoPink3.png'
import logo4 from '../../../assets/logoPink4.png'


export default function Navbar(props) {

    

    return(
        <div className='navbar'>
            <div className='navTitle'>
                <img src={logo2} alt="" />
                {/* MyAnimeList */}
            </div>
            <div className='navPages'>
                <Link to="/" className={props.active === "animes" ? 'linkPageActive' : 'linkPage'} onClick={()=>props.setActive("animes")}><div>Top Anime</div></Link>
                <Link to="/manga" className={props.active === "mangas" ? 'linkPageActive' : 'linkPage'} onClick={()=>props.setActive("mangas")}><div>Top Manga</div></Link>
                <Link to="/characters" className={props.active === "charas" ? 'linkPageActive' : 'linkPage'} onClick={()=>props.setActive("charas")}><div>Top Characters</div></Link>
            </div>
            <div className='navTitle'>
                <img src={logo3} alt="" />
                {/* MyAnimeList */}
            </div>
        </div>
    )
}