import './Mangas.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'

export default function Mangas(props) {

    const [animes, setAnimes] = useState([])
    const [animesFilt, setAnimesFilt] = useState([])
    const [dataState, setDataState] = useState(false)
    const [searchAnime, setSearchAnime] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/top/manga?page=${page}`)
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
    }, [page])

    useEffect(() => {
        let filt = animes.filter(l => l.titles[0].title.toLowerCase().includes(searchAnime.toLowerCase()));
        setAnimesFilt(filt);
    }, [searchAnime, animes])   

    function plusUn() {
        if (page < 100) {
            setPage(page+1)
        } else {
            setPage(page)
        }
    }

    function moinsUn() {
        if (page > 1) {
            setPage(page-1)
        } else {
            setPage(page)
        }
    }

    return(
        <div className='mangas'>
            <Navbar active={props.active} setActive={props.setActive}/>
            <div className='searchBar'>
                <input type="text" className='search' placeholder="Nom du manga..." value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)}/>
            </div>
            <div className='pages'>
                <div className='btnPage' onClick={moinsUn}>
                    <span>←</span>
                </div>
                <div>{page} / 100</div>
                <div className='btnPage' onClick={plusUn}>
                    <span>→</span>
                </div>
            </div>
            <div className='manga'>
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
            {dataState === false && <div className='loading'>Loading...</div>}
            </div>
        </div>
    )
}