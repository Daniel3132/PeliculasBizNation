import React, { useEffect} from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos } from '../redux/actions/actionFavoritos'
import { listPelicula } from '../redux/actions/actionPeliculas'


const PeliculaDetail = () => {
  const dispatch = useDispatch()

  const { peliculas } = useSelector(store => store.peliculas)
  const { nombre } = useParams();

  useEffect(() => {
    dispatch(listPelicula())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pelicula = peliculas.find(p => p.titulo === nombre)
  const { titulo, descripcion, fecha, imagen } = pelicula;

  const agregarFavorito = (pelicula) => {
    dispatch(Crearfavoritos({
      ...pelicula
    }))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      imageUrl: pelicula.imagen,
      imageWidth: 50,
      imageHeight: 80,
      title: `${titulo} agregada a favoritos`,
      showConfirmButton: false,
      timer: 1500
    })
  }


  return (
    <div>
      <span onClick={() => agregarFavorito(pelicula)}>favorito</span>
      <h3>{titulo}</h3>
      <p>{fecha}</p>
      <img width={300} src={imagen} alt="" />
      <p>{descripcion}</p>
    </div>
  )
}

export default PeliculaDetail