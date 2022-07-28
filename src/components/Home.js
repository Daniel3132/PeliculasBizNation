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
  peliculas = peliculas.filter(p => categoriaElegida !== '' ? p.categoria === categoriaElegida.toLowerCase() : p)

  const [busqueda, setBusqueda] = useState('')
  peliculas = peliculas.filter(p => p.titulo.toLowerCase().includes(busqueda))

  const [cantidad, setCantidad] = useState(10)
  peliculas = peliculas.splice(0, cantidad)

  const [values, handleInputChange, reset] = useForm({ 
    busqueda: '',
    categoria: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    reset()
    setBusqueda(values.busqueda.toLowerCase())
  }

  const handleCategorias = () => {
    setCategoriaElegida(document.getElementById('sele').value)
  }

  const handleCantidad = () => {
    setCantidad(document.getElementById('canti').value)
  }

  useEffect(() => {
    dispatch(listPelicula())
  }, [])

  return (
    <section id='home'>

      <div className="filtros">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Buscar por nombre' name='busqueda' onChange={handleInputChange} />
          <button type="submit">
            <img src="https://res.cloudinary.com/dcyn2bjb9/image/upload/v1649626694/samples/amazonas/search_a5gq1t.png" alt="" />
          </button>
        </form>

        {categoriaElegida === ''
          ? <h2>Todas las películas {!busqueda ? '' : ' - ' + busqueda}</h2>
          : <h2>Películas de {categoriaElegida + (!busqueda ? '' : ' - ' + busqueda)}</h2>
        }

        <div className="categoriasCont">
          <select name="categoria" id='sele' onChange={handleCategorias}>
            <option value="">Todas las Categorias</option>
            <option value="Accion">Acción</option>
            <option value="Anime">Anime</option>
            <option value="Crimen">Crimen</option>
            <option value="SuperHeroes">SuperHeroes</option>
            <option value="Terror">Terror</option>
          </select>
        </div>
      <p>max. películas: <input type="number" id='canti' defaultValue={cantidad} onChange={handleCantidad} />
      </p>
      </div>

      <ListarPelis peliculas={peliculas} />
    </section>
  )
}

export default Home