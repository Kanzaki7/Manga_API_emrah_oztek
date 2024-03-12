import './Chara.css'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router'
import { useState, useEffect, } from 'react'


export default function Chara(props) {

    const [animes, setAnimes] = useState([])
    const [dataState, setDataState] = useState(false)

    let { id } = useParams()

    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/characters/${id}/full`)
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
                        <div className='descPerso'>
                            <div className='descInfosPerso'>
                                <h1>{ animes.name }</h1>
                                <h2>{ animes.name_kanji }</h2>
                                <div className='nck'>
                                    <h3>Nicknames : </h3>
                                    {
                                        animes.nicknames.map((nick, index)=>(
                                            <p className='pPerso' key={index}> { '"' + nick + '"' } </p>
                                        ))
                                    }
                                </div>
                                <p className='sypTitle'>About:</p>
                                <p className='sypnopsis'>{animes.about}</p>
                                <div className='animesPerso'>
                                    <p className='sypTitle'>Animes : </p>
                                    {
                                        animes.anime.map((nick, index)=>(
                                            <p className='gras' key={index}> { '"' + nick.anime.title + '"' } </p>
                                        ))
                                    }
                                </div>
                                <div className='animesPerso'>
                                    <p className='sypTitle'>Mangas : </p>
                                    {
                                        animes.manga.map((nick, index)=>(
                                            <p className='gras' key={index}> { '"' + nick.manga.title + '"' } </p>
                                        ))
                                    }
                                </div>
                                {/* <p><span className='gras'>Manga : </span>{animes.published.string}</p> */}
                            </div>
                            <div className='descImgPerso'>
                                <img src={animes.images.jpg.image_url} alt="" />
                            </div>
                        </div>       
                    </div>
                    
                : <div className='loading'>Loading...</div> 
                }
        </div>
    )
}