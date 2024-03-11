import './Mangas.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'

export default function Mangas(props) {

    const [animes, setAnimes] = useState([])
    const [animesFilt, setAnimesFilt] = useState([])
    const [dataState, setDataState] = useState(false)
    const [searchAnime, setSearchAnime] = useState("")

    useEffect(() => {
        fetch("https://api.jikan.moe/v4/top/manga")
            .then((response) => response.json())
            .then((response) => setAnimes(response.data))
            .catch((error) => console.log(error));
            console.log(animes);
        setTimeout(() => {
            if (animes) {
                setDataState(true)
            } else {
                setDataState(false)
            }
        }, 300);
    }, [])

    useEffect(() => {
        let filt = animes.filter(l => l.titles[0].title.toLowerCase().includes(searchAnime.toLowerCase()));
        setAnimesFilt(filt);
    }, [searchAnime, animes])   

    return(
        <div className='mangas'>
            <Navbar/>
            <div className='searchBar'>
                <input type="text" className='search' value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)}/>
            </div>
            <div className='animes'>
                {dataState === true ?
                    
                    animesFilt.map((anime, index) => (
                        <div className='anime' key={index}>
                            <div className='divImg'>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </div>
                            <div className='divInfos'>
                                <div className='infos'>
                                    <p className='infoTitle'>{anime.titles[0].title}</p>
                                    <p><span className='gras'>volumes : </span> {anime.volumes}</p>
                                    <p><span className='gras'>Score : </span>{anime.score}</p>
                                    <p><span className='gras'>Studio : </span>{anime.authors[0].name}</p>
                                </div>
                                <div className='infosDiv'>
                                    <Link to={"/manga/"+anime.mal_id} className='animeLink'><div className='btnInfosManga'>Plus d'info</div></Link>
                                </div>
                            </div>
                        </div>
                    ))
                : null 
            }
            </div>
        </div>
    )
}