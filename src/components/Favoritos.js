import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { obtenerLocalStorage } from '../helpers/LocalStorage'
import { Eliminarfavoritos } from '../redux/actions/actionFavoritos';
import ListarPelis from './ListarPelis'


const Favoritos = () => {
  const dispatch = useDispatch()

  const favoritas = obtenerLocalStorage();
  const pelis = favoritas.favorito.favorito
  console.log(pelis);

  const eliminarFavorito = (id) => {
    Swal.fire({
        title: '¿Quitar de favoritos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(Eliminarfavoritos(id))
            Swal.fire(
                'Eliminado!',
                'success'
            )
        }
    })
}


  return (
    <section id='section'>
      {
        pelis.length !== 0 ? <ListarPelis peliculas={pelis} favorito={true} eliminarFavorito={eliminarFavorito}/>
        : <h2>Aún no has agregado nada a favoritos</h2>
      }
    </section>
  )
}

export default Favoritos