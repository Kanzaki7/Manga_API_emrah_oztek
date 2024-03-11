import { useState, useEffect, } from 'react'
import './App.css'
import Home from './assets/components/Home/Home';
import Anime from './assets/components/Anime/Anime';
import Mangas from './assets/components/Mangas/Mangas';
import Manga from './assets/components/Manga/Manga';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';

function App() {


  const routeur = createBrowserRouter([
    {
      path:"/",
      element: <Home />,
      // errorElement: <Erreur />
    },
    {
      path:"/anime/:id",
      element: <Anime />,
      // errorElement: <Erreur />
    },
    {
      path:"/manga",
      element: <Mangas />,
      // errorElement: <Erreur />
    },
    {
      path:"/manga/:id",
      element: <Manga />,
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
