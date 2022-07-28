import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos } from '../redux/actions/actionFavoritos'
import '../styles/pelisCont.scss'

const PelisCont = ({ peliculas, favorito, eliminarFavorito }) => {
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
            background: "#000",
            color: "white"
        })
    }

    return (
        <section id='peliscont'>
            <div className='CardsCont'>
                {
                    peliculas.length === 0 ? <h2>No se encontró ningún titulo</h2>
                        :
                        peliculas.map((p, index) => ( //parentesis para hacer el return
                            <div key={index}>

                                <h2>{p.titulo}</h2>
                                <Link to={`/detail/${p.titulo}`}>
                                    <img src={p.imagen} alt="" />
                                </Link>
                                <small>{p.fecha}</small>
                                {
                                    favorito ?
                                        <span onClick={() => eliminarFavorito(p.codigo)}>
                                            <img src="https://res.cloudinary.com/dcyn2bjb9/image/upload/v1658973386/samples/amazonas/delete-stop-svgrepo-com_m3i2z8.svg" alt="" />
                                        </span>
                                        : <span className='favorito' onClick={() => agregarFavorito(p)}>
                                            <img src="https://res.cloudinary.com/dcyn2bjb9/image/upload/v1658972940/samples/amazonas/favorite-svgrepo-com_etkt6d.svg" alt="" />
                                        </span>
                                }
                            </div>
                        ))}
            </div>
        </section>
    )
}

export default PelisCont