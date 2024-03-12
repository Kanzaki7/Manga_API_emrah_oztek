import './Manga.css'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router'
import { useState, useEffect, } from 'react'
import star from '../../../assets/star.png'

export default function Manga(props) {

    const [animes, setAnimes] = useState([])
    const [dataState, setDataState] = useState(false)
    console.log(animes)
    let  { id }  = useParams()

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/manga/${id}/full`)
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
                                        <h2>{ animes.title_japanese }</h2>
                                        <p className='sypTitle'>Synopsis:</p>
                                        <p className='sypnopsis'>{animes.synopsis}</p>
                                        <p className='gras'>Author : {animes.authors[0].name}</p>
                                        <div className='genre'>
                                            <p className='gras'>Genre(s) : </p> 
                                            <div className='genres'>{animes.genres.map((genre,index)=>(
                                            <p key={index}>{genre.name}</p>
                                        ))}</div></div>
                                        <p><span className='gras'>Status : </span>{animes.status}</p>
                                        <p><span className='gras'>Status : </span>{animes.published.string}</p>
                                    </div>
                                    <div className='descImgManga'>
                                        <img src={animes.images.jpg.large_image_url} alt="" />
                                    </div>
                                </div>       
                            </div>
                            
                        : <div className='loading'>Loading...</div> 
                        }
                </div>
    )
}