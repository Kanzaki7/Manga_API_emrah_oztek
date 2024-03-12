import { useState, useEffect, } from 'react'
import './App.css'
import Home from './assets/components/Home/Home';
import Anime from './assets/components/Anime/Anime';
import Mangas from './assets/components/Mangas/Mangas';
import Manga from './assets/components/Manga/Manga';
import Charas from './assets/components/Charas/Charas';
import Chara from './assets/components/Chara/Chara';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';

function App() {

  const [active, setActive] = useState("animes")
  

  const routeur = createBrowserRouter([
    {
      path:"/",
      element: <Home active={active} setActive={setActive}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/anime/:id",
      element: <Anime />,
      // errorElement: <Erreur />
    },
    {
      path:"/manga",
      element: <Mangas active={active} setActive={setActive}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/manga/:id",
      element: <Manga />,
      // errorElement: <Erreur />
    },
    {
      path:"/characters",
      element: <Charas active={active} setActive={setActive}/>,
      // errorElement: <Erreur />
    },
    {
      path:"/characters/:id",
      element: <Chara />,
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
