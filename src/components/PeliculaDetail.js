import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos } from '../redux/actions/actionFavoritos'
import { listPelicula } from '../redux/actions/actionPeliculas'
import '../styles/peliDetail.scss'

const PeliculaDetail = () => {
  const dispatch = useDispatch()

  const { nombre } = useParams(); //tomar nombre desde la url (query)
  const { peliculas } = useSelector(store => store.peliculas)

  useEffect(() => {
    dispatch(listPelicula())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pelicula = peliculas.find(p => p.titulo === nombre)

  const agregarFavorito = (pelicula) => {
    dispatch(Crearfavoritos({
      ...pelicula
    }))
    Swal.fire({
      position: 'center',
      icon: 'success',
      imageUrl: pelicula.imagen,
      imageWidth: 50,
      imageHeight: 80,
      title: `${pelicula.titulo} agregada a favoritos`,
      showConfirmButton: false,
      timer: 1500,
      background: "#000",
      color: "white"
    })
  }

  return (
    <section id='peliDetail'>
      <div>
        <img className='imgPeli' width={300} src={pelicula?.imagen} alt="" />
        <div>
          <div>
            <span className='favorito' onClick={() => agregarFavorito(pelicula)}>
              <img src="https://res.cloudinary.com/dcyn2bjb9/image/upload/v1658972940/samples/amazonas/favorite-svgrepo-com_etkt6d.svg" alt="" />
            </span>
            <h2>{pelicula?.titulo}</h2>
          </div>
          <span>{pelicula?.categoria}</span>
          <small>{pelicula?.fecha}</small>
          <p>{pelicula?.descripcion}</p>
        </div>
      </div>
    </section>
  )
}

export default PeliculaDetail