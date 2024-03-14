import './Home.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'


export default function Home(props) {

    const [animes, setAnimes] = useState([])
    const [animesFilt, setAnimesFilt] = useState([])
    const [dataState, setDataState] = useState(false)
    const [searchAnime, setSearchAnime] = useState("")
    const [epsAnime, setEpsAnime] = useState("tous")
    const [rating, setRating] = useState("")
    const [btnLike, setBtnLike] = useLocalStorage("btnlike")
    const [hearth, setHearth] = useLocalStorage("hearth")
    const [page, setPage] = useState(1)
    const [state, setState] = useState(-1)
    // const [animeID, setAnimeID] = useState("")
   
  
    // async function search() {
    //   await fetch("https://api.jikan.moe/v4/top/anime")
    //         .then((response) => response.json())
    //         .then((response) => setAnimes(response.data))
    //         .catch((error) => console.log(error));
    //         console.log(animes);
    // }        
  
    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/top/anime?rating=${rating}&page=${page}`)
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
    }, [page, rating])

    useEffect(() => {
        let filt = animes.filter(l => l.titles[0].title.toLowerCase().includes(searchAnime.toLowerCase()))
        .filter((l) => {
            switch (rating) {
                case "g":
                    return l.rating === "G - All Ages";
                case "pg":
                    return l.rating === "PG - Children";
                case "pg13":
                    return l.rating === "PG-13 - Teens 13 or older";
                case "r17":
                    return l.rating === "R - 17+ (violence & profanity)";
                case "r":
                    return l.rating === "R+ - Mild Nudity";
                case "rx":
                    return l.rating === "Rx - Hentai";
                default:
                    return "all";
            }
        })
        .filter((l) => {
            switch (epsAnime) {
                case "epi12":
                    return l.episodes <= 12;
                case "epi24":
                    return l.episodes <= 24;
                case "plus24":
                    return l.episodes > 24;
                default:
                    return "tous";
            }
        });
        setAnimesFilt(filt);
    }, [searchAnime, animes, rating, epsAnime])

    

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

    function Like(index) {
        setState(index)
        let favA = [...animes]
        favA[index].favori = false
        if (favA[index].favori === false) {
            favA[index].favori = true
        } else if (favA[index].favori === true) {
            favA[index].favori = false
        }
        console.log(favA[index].favori);
        props.setFavoriAnime(favA)
        // if (btnLike === "btnlike") {
        //     setBtnLike("btnlikeActive")
        // } else if (btnLike === "btnlikeActive") {
        //     setBtnLike("btnlike")
        // }
        // if (hearth === "hearth") {
        //     setHearth("hearthActive")
        // } else if (hearth === "hearthActive") {
        //     setHearth("hearth")
        // }
        
    }

    // useEffect(() => {
    //     props.setFavori(!props.favori)
    //   }, [])


    return(
        <div className='home'>
            <Navbar active={props.active} setActive={props.setActive}/>
            <div className='searchBar'>
                <input type="text" className='search' placeholder="Nom de l'anime..." value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)}/>
                <div className='filter'>
                    <select name="anime" id="rating" onChange={(e)=>setRating(e.target.value)}>
                        <option value="">Tous (Rating)</option>
                        <option value="g">G - All Ages</option>
                        <option value="pg">PG - Children</option>
                        <option value="pg13">PG13 - Teens 13 or older</option>
                        <option value="r17">R - 17+(violence & profanity)</option>
                        <option value="r">R+ - Mild Nudity</option>
                        <option value="rx">Rx - Hentai</option>
                    </select>
                    <select name="anime" id="episodes" onChange={(e)=>setEpsAnime(e.target.value)}>
                        <option value="tous">Tous (épisodes)</option>
                        <option value="epi12">12 épisodes ou moins</option>
                        <option value="epi24">24 épisodes ou moins</option>
                        <option value="plus24">Plus de 24 épisodes</option>
                    </select>
                </div>
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
            <div className='animes'>
            {dataState === true  ?
                
                    animesFilt.map((anime, index) => (
                        <div className='anime' key={index}>
                            <div className='divImg'>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </div>
                            <div className='divInfos'>
                                <div className='infos'>
                                    <p className='infoTitle'>{anime.titles[0].title}</p>
                                    <p><span className='gras'>épisodes : </span> {anime.episodes}</p>
                                    <p><span className='gras'>Score : </span>{anime.score}</p>
                                    <p><span className='gras'>Studio : </span>{anime.studios.length === 0 ? "No studio" : anime.studios[0].name}</p>
                                </div>
                                <div className='infosDiv'>
                                    <div className='like'>
                                        <div className="btnlike" onClick={()=>Like(index)}>
                                            <p className="hearth">❤️</p>
                                        </div>
                                    </div>
                                    <Link to={"/anime/"+anime.mal_id} className='animeLink'><div className='btnInfos'>Plus d'info</div></Link>
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