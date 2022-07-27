import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos } from '../redux/actions/actionFavoritos'
import { listPelicula } from '../redux/actions/actionPeliculas'


const PeliculaDetail = () => {
  const dispatch = useDispatch()

  const { peliculas } = useSelector(store => store.peliculas)
  const { nombre } = useParams();
  console.log(nombre);

  useEffect(() => {
    dispatch(listPelicula())
  }, [])

  const pelicula = peliculas.find(p => p.titulo === nombre)
  const {titulo, descripcion, fecha, imagen} = pelicula;

  const agregarFavorito = () => {
    dispatch(Crearfavoritos({
      ...pelicula,
      cantidad: 1
    }))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${titulo} agregada a favoritos`,
      showConfirmButton: false,
      timer: 1500
    })
  }


  return (
    <div>
      <h3>{titulo}</h3>
      <p>{fecha}</p>
      <img width={300} src={imagen} alt="" />
      <p>{descripcion}</p>
    </div>
  )
}

export default PeliculaDetail