import './Manga.css'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router'
import { useState, useEffect, } from 'react'

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
        <div>
            <Navbar/>
            {dataState === true ?
                <div>{animes.titles[0].title}</div>
            : "Loading"}
        </div>
    )
}