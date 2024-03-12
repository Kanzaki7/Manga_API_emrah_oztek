import './Anime.css'
import { useState, useEffect, } from 'react'
import { useParams } from 'react-router'
import Navbar from '../Navbar/Navbar'
import star from '../../../assets/star.png'

export default function Anime(props) {

    const [animes, setAnimes] = useState([])
    const [dataState, setDataState] = useState(false)
    console.log(animes)
    let  { id }  = useParams()

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
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

    // useEffect(() => {
    //   console.log(id);

    // }, [])
    

    return(
        <div className='descAnime'>
            <Navbar />
                {dataState === true ?
                    <div className='animeDesc'>
                        <div className='desc'>
                            <div className='descInfos'>
                                <div className='title-score'>
                                    <h1>{ animes.title }</h1>
                                    <div className='score'>
                                        <img src={star} alt="" />
                                        <p className='gras score-title'>{animes.score}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2>{ animes.title_japanese }</h2>
                                </div>
                                <p className='sypTitle'>Synopsis:</p>
                                <p className='sypnopsis'>{animes.synopsis}</p>
                                <p className='gras'>Studio : {animes.studios[0].name}</p>
                                <div className='genre'>
                                    <p className='gras'>Genre(s) : </p> 
                                    <div className='genres'>{animes.genres.map((genre,index)=>(
                                    <p key={index}>{genre.name}</p>
                                ))}</div></div>
                                <p className='sypTitle'>Opening :</p>
                                {animes.theme.openings.map((opening, index) => (
                                    <div key={index} className='op'>{opening}</div>
                                ))}
                                <p className='sypTitle'>Ending :</p>
                                {animes.theme.endings.map((ending, index) => (
                                    <div key={index} className='op'>{ending}</div>
                                ))}
                                <iframe src={animes.trailer.embed_url} width="120%" height="500" allowFullScreen></iframe>
                            </div>
                            <div className='descImg'>
                                <img src={animes.images.jpg.large_image_url} alt="" />
                            </div>
                        </div>       
                    </div>
                    
                : <div className='loading'>Loading...</div> 
                }
        </div>
    )
}