import './Home.css'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom'

export default function Home(props) {

    const [animes, setAnimes] = useState([])
    const [animesFilt, setAnimesFilt] = useState([])
    const [dataState, setDataState] = useState(false)
    const [searchAnime, setSearchAnime] = useState("")
    const [epsAnime, setEpsAnime] = useState("tous")
    // const [animeID, setAnimeID] = useState("")
  
    // async function search() {
    //   await fetch("https://api.jikan.moe/v4/top/anime")
    //         .then((response) => response.json())
    //         .then((response) => setAnimes(response.data))
    //         .catch((error) => console.log(error));
    //         console.log(animes);
    // }        
  
    useEffect(() => {
        fetch("https://api.jikan.moe/v4/top/anime")
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

    // useEffect(() => {
    //     let filtEp1 = animesFilt.filter(l => l.episdodes <= 12);
    //     setAnimesFilt2(filtEp1);
    // }, [searchAnime, animes])
    // useEffect(() => {
    //     let filtEp2 = animesFilt.filter(l => l.episdodes <= 24);
    //     setAnimesFilt2(filtEp2);
    // }, [searchAnime, animes])
    // useEffect(() => {
    //     let filtEp3 = animesFilt.filter(l => l.episdodes > 24);
    //     setAnimesFilt2(filtEp3);
    // }, [searchAnime, animes])


    return(
        <div className='home'>
            <Navbar/>
            <div className='searchBar'>
                <input type="text" className='search' value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)}/>
                <select name="anime" id="episodes" onChange={(e)=>setEpsAnime(e.target.value)}>
                    <option value="tous">Tous</option>
                    <option value="epi12">12 épisodes ou moins</option>
                    <option value="epi24">24 épisodes ou moins</option>
                    <option value="plus24">Plus de 24 épisodes</option>
                </select>
            </div>
            <div className='animes'>
            {(dataState === true && epsAnime === "tous") ?
                
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
                                    <p><span className='gras'>Studio : </span>{anime.studios[0].name}</p>
                                </div>
                                <div className='infosDiv'>
                                    <Link to={"/anime/"+anime.mal_id} className='animeLink'><div className='btnInfos'>Plus d'info</div></Link>
                                </div>
                            </div>
                        </div>
                    ))
                : null 
            }
            {(dataState === true && epsAnime === "epi12") ?
                
                    animesFilt.filter(l => l.episodes <= 12).map((anime, index) => (
                        <div className='anime' key={index}>
                            <div className='divImg'>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </div>
                            <div className='divInfos'>
                                <div className='infos'>
                                    <p className='infoTitle'>{anime.titles[0].title}</p>
                                    <p><span className='gras'>épisodes : </span> {anime.episodes}</p>
                                    <p><span className='gras'>Score : </span>{anime.score}</p>
                                    <p><span className='gras'>Studio : </span>{anime.studios[0].name}</p>
                                </div>
                                <div className='infosDiv'>
                                    <Link to={"/anime/"+anime.mal_id} className='animeLink'><div className='btnInfos'>Plus d'info</div></Link>
                                </div>
                            </div>
                        </div>
                    ))
                : null 
            }
            {(dataState === true && epsAnime === "epi24") ?
                
                    animesFilt.filter(l => l.episodes <= 24).map((anime, index) => (
                        <div className='anime' key={index}>
                            <div className='divImg'>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </div>
                            <div className='divInfos'>
                                <div className='infos'>
                                    <p className='infoTitle'>{anime.titles[0].title}</p>
                                    <p><span className='gras'>épisodes : </span> {anime.episodes}</p>
                                    <p><span className='gras'>Score : </span>{anime.score}</p>
                                    <p><span className='gras'>Studio : </span>{anime.studios[0].name}</p>
                                </div>
                                <div className='infosDiv'>
                                    <Link to={"/anime/"+anime.mal_id} className='animeLink'><div className='btnInfos'>Plus d'info</div></Link>
                                </div>
                            </div>
                        </div>
                    ))
                : null 
            }
            {(dataState === true && epsAnime === "plus24") ?
                
                    animesFilt.filter(l => l.episodes > 24).map((anime, index) => (
                        <div className='anime' key={index}>
                            <div className='divImg'>
                                <img src={anime.images.jpg.image_url} alt="" />
                            </div>
                            <div className='divInfos'>
                                <div className='infos'>
                                    <p className='infoTitle'>{anime.titles[0].title}</p>
                                    <p><span className='gras'>épisodes : </span> {anime.episodes}</p>
                                    <p><span className='gras'>Score : </span>{anime.score}</p>
                                    <p><span className='gras'>Studio : </span>{anime.studios[0].name}</p>
                                </div>
                                <div className='infosDiv'>
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