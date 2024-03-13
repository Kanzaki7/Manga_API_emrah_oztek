import './Favoris.css'
import Navbar from '../Navbar/Navbar'

export default function Favoris(props) {
    return(
        <div className='favoris'>
            <Navbar active={props.active} setActive={props.setActive}/>
            <div className='animesFavori'>
                <p className='sypTitle'>Animes :</p>
                {
                    props.favoriAnime.filter((l)=>l.favori === true).map((favn, index) => (
                        <div key={index} className='favAn'>
                            <img src={favn.images.jpg.image_url} alt="" />
                            <p className='Antitle'>{favn.titles[0].title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}