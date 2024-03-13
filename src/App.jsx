import { useState, useEffect, } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks"
import './App.css'
import Home from './assets/components/Home/Home';
import Anime from './assets/components/Anime/Anime';
import Mangas from './assets/components/Mangas/Mangas';
import Manga from './assets/components/Manga/Manga';
import Charas from './assets/components/Charas/Charas';
import Chara from './assets/components/Chara/Chara';
import Favoris from './assets/components/Favoris/Favoris';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';

function App() {

  const [active, setActive] = useState("animes")
  const [favoriAnime, setFavoriAnime] = useLocalStorage([])
  const [favoriManga, setFavoriManga] = useLocalStorage([])
  const [favoriChara, setFavoriChara] = useLocalStorage([])
  const [favori, setFavori] = useState(false)

  const routeur = createBrowserRouter([
    {
      path:"/",
      element: <Home active={active} setActive={setActive} favoriAnime={favoriAnime} setFavoriAnime={setFavoriAnime} favori={favori} setFavori={setFavori}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/anime/:id",
      element: <Anime />,
      // errorElement: <Erreur />
    },
    {
      path:"/manga",
      element: <Mangas active={active} setActive={setActive} favoriManga={favoriManga} setFavoriManga={setFavoriManga} favori={favori}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/manga/:id",
      element: <Manga />,
      // errorElement: <Erreur />
    },
    {
      path:"/characters",
      element: <Charas active={active} setActive={setActive} favoriChara={favoriChara} setFavoriChara={setFavoriChara} favori={favori}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/characters/:id",
      element: <Chara />,
      // errorElement: <Erreur />
    },
    {
      path:"/favori",
      element: <Favoris active={active} setActive={setActive} favoriAnime={favoriAnime} favoriManga={favoriManga} favoriChara={favoriChara} />,
      // errorElement: <Erreur />
    }
])

  return (
    <>
      <RouterProvider router={routeur}/>
    </>
  )
}

export default App
