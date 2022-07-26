import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { obtenerLocalStorage } from '../helpers/LocalStorage'
import { Eliminarfavoritos } from '../redux/actions/actionFavoritos';
import ListarPelis from './ListarPelis'

const Favoritos = () => {
  const dispatch = useDispatch()
  const [pelis, setPelis] = useState([])

  const getFavs = () => {
    setPelis(obtenerLocalStorage().favorito.favorito);
  }

  useEffect(() => {
    getFavs();
  }, [])

  const eliminarFavorito = (id) => {
    Swal.fire({
      title: '¿Quitar de favoritos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Si, Eliminar!',
      background: "#000",
      color: "white"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(Eliminarfavoritos(id))
        Swal.fire(
          'Eliminado!',
        )
      }
      getFavs() //actualizar luego de eliminar
    })
  }

  return (
    <section id='section'>
      { //eliminar o agregar segun desde donde se llame ListarPelis
        pelis.length !== 0
          ? <ListarPelis peliculas={pelis} favorito={true} eliminarFavorito={eliminarFavorito} />
          : <h2>Aún no has agregado nada a favoritos</h2>
      }
    </section>
  )
}

export default Favoritos