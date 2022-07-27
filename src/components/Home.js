import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { listPelicula } from '../redux/actions/actionPeliculas'
import '../styles/home.scss'
import ListarPelis from './ListarPelis'

const Home = () => {
  const dispatch = useDispatch()
  let { peliculas } = useSelector(store => store.peliculas)

  const [categoriaElegida, setCategoriaElegida] = useState('')
  peliculas = peliculas.filter(p => categoriaElegida !== '' ? p.categoria === categoriaElegida : p)
  
  const [busqueda, setBusqueda] = useState('')
  peliculas = peliculas.filter(p => p.titulo.toLowerCase().includes(busqueda))

  const [values, handleInputChange, reset] = useForm({
    busqueda: '',
    categoria: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    reset()
    setBusqueda(values.busqueda.toLowerCase())
  }

  const handleCategorias=()=>{
    setCategoriaElegida(document.getElementById('sele').value)
  }

  useEffect(() => {
    dispatch(listPelicula())
  }, [])

  return (
    <section id='home'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Buscar por nombre' name='busqueda' onChange={handleInputChange} />
      </form>

        <select name="categoria" id='sele' onChange={handleCategorias}>
          <option value="">Todas las Categorias</option>
          <option value="accion">Acción</option>
          <option value="anime">Anime</option>
          <option value="crimen">Crimen</option>
          <option value="superHeroes">SuperHeroes</option>
          <option value="terror">Terror</option>
        </select>

      {categoriaElegida === '' ?<h2>Todas las películas</h2> : <h2>Películas de {categoriaElegida}</h2> }  
      <ListarPelis peliculas={peliculas} />
    </section>
  )
}

export default Home