import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos, Eliminarfavoritos } from '../redux/actions/actionFavoritos'
import '../styles/pelisCont.scss'

const PelisCont = ({peliculas, favorito, eliminarFavorito }) => {
    const dispatch = useDispatch()

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
            background : "#000",
            color : "white"
        })
    }

    
    return (
        <section id='peliscont'>
            <div className='CardsCont'>
                {
                    //parentesis para hacer el return
                    peliculas.map((p, index) => (
                        <div key={index}>
                            <div>
                                <p>{p.titulo}</p>
                                <Link to={`/detail/${p.titulo}`}>
                                    <img src={p.imagen} alt="" />
                                </Link>
                            </div>
                            {
                                favorito ? <span onClick={() => eliminarFavorito(p.codigo)}>Quitar de favoritos</span>
                                : <span onClick={() => agregarFavorito(p)}>favorito</span>
                            }
                            <span>{p.fecha}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PelisCont