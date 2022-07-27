import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Crearfavoritos } from '../redux/actions/actionFavoritos'
import { listPelicula } from '../redux/actions/actionPeliculas'
import '../styles/pelisCont.scss'

const PelisCont = () => {
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)
    const [categoriaElegida, setCategoriaElegida] = useState('')
    const [enviarDatosModal, setEnviarDatosModal] = useState([])

    let { peliculas } = useSelector(store => store.peliculas)

    peliculas = peliculas.filter(p => categoriaElegida !== '' ? p.categoria === categoriaElegida : p)

    useEffect(() => {
        dispatch(listPelicula())
    }, [])

    const { title } = useParams();
    const pelicula = peliculas.find(p => p.title === title)

    const agregarCarrito=()=>{
        dispatch(Crearfavoritos({
            ...pelicula,
            cantidad: 1
        }))
        
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
                                <img src={p.imagen} alt="" />
                                <Link to={`/detail/${p.titulo}`}><h2>Ver más</h2></Link>
                            </div>
                            <span>{p.fecha}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default PelisCont