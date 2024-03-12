import './Charas.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'

export default function Charas(props) {

    const [animes, setAnimes] = useState([])
    const [animesFilt, setAnimesFilt] = useState([])
    const [dataState, setDataState] = useState(false)
    const [searchAnime, setSearchAnime] = useState("")
    const [page, setPage] = useState(1)


    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/top/characters?page=${page}`)
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
        let filt = animes.filter(l => l.name.toLowerCase().includes(searchAnime.toLowerCase()));
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
        <div className='characters'>
            <Navbar active={props.active} setActive={props.setActive}/>
            <div className='searchBar'>
                <input type="text" className='search' placeholder="Nom du personnage..." value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)}/>
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
            <div className='charas'>
            {dataState === true ?
                
                    animesFilt.map((anime, index) => (
                        <Link className='persoLink' to={'/characters/'+anime.mal_id}>
                            <div className='perso' key={index}>
                                <div className='divImgPerso'>
                                    <img src={anime.images.jpg.image_url} alt="" />
                                </div>
                                <div className='infosPerso'>
                                    <p className='persoName'>{anime.name}</p>
                                    <div className='names'>
                                        <p className='nickname'>Nicknames :                                         <div className='divNick'>
                                                {
                                                    anime.nicknames.map((nick, index)=>(
                                                        <span className='name' key={index}> { '"' + nick + '"' } </span>
                                                    ))
                                                }
                                            </div></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                : null 
            }
            {dataState === false && <div className='loading'>Loading...</div>}
            </div>
        </div>
    )
}