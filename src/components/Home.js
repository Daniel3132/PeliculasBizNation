import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPelicula } from '../redux/actions/actionPeliculas'
import '../styles/home.scss'
import ListarPelis from './ListarPelis'

const Home = () => {
  const dispatch = useDispatch()

  const [categoriaElegida, setCategoriaElegida] = useState('')

  let { peliculas } = useSelector(store => store.peliculas)

  peliculas = peliculas.filter(p => categoriaElegida !== '' ? p.categoria === categoriaElegida : p)

  useEffect(() => {
    dispatch(listPelicula())
  }, [])

  return (
    <section id='home'>
      <ListarPelis peliculas={peliculas}/>
    </section>
  )
}

export default Home