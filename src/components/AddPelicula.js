import React from 'react'
import '../styles/addForm.scss'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'
import Swal from 'sweetalert2'
import { FileUp } from '../helpers/FileUp'
import { useForm } from '../hooks/useForm'
import { addPelicula } from '../redux/actions/actionPeliculas'

const AddPelicula = () => {
    const dispatch = useDispatch()
    const [values, handleInputChange, reset] = useForm({
        titulo: '',
        descripcion: '',
        fecha: '',
        categoria: '',
        imagen: ''
    })

    const codigo = uuid()
    const { titulo, descripcion, fecha, categoria, imagen } = values

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(addPelicula(
            {
                ...values,
                codigo
            }
        ))
        reset()

        Swal.fire({
            title: 'Agregado!',
            imageUrl: values.imagen,
            imageWidth: 200,
            imageHeight: 300,
            imageAlt: 'Custom image',
            background: "#000",
            color: "white"
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        //el FileUp es la configuracion con cloudinary y le asigno la respuesta de cloudi a la imagen
        FileUp(file)
            .then(resp => {
                values.imagen = resp
                console.log(resp)
            })
            .catch(error => {
                console.warn(error)
            })

        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Agregando',
            showConfirmButton: false,
            timer: 2000 //tiempo de carga a cludinary
        })
    }

    return (
        <section id='addFormCont'>
            <form onSubmit={handleSubmit} className="addForm">
                <h3>Agregar Película</h3>
                <div>
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" name="titulo" placeholder="Titulo" value={titulo} onChange={handleInputChange} required autoFocus />
                </div>

                <div>
                    <label htmlFor="descripcion">Descripcion:</label>
                    <textarea type="text" rows="4" cols="50" name="descripcion" placeholder="Descripcion" value={descripcion} onChange={handleInputChange} required />
                </div>

                <div>
                    <label htmlFor="fecha">Fecha de estreno:</label>
                    <input type="date" name="fecha" placeholder="fecha" value={fecha} onChange={handleInputChange} required />
                </div>

                <div>
                    <label htmlFor="categoria">Categoria:</label>
                    <select type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={handleInputChange} required>
                        <option value="accion">Acción</option>
                        <option value="anime">Anime</option>
                        <option value="crimen">Crimen</option>
                        <option value="superheroes">SuperHeroes</option>
                        <option value="terror">Terror</option>
                    </select>
                </div>

                <div className="file-input">
                    <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        className="file-input__input"
                        onChange={handleFileChange}
                        required
                    />
                    <label className="file-input__label" htmlFor="file-input">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="upload"
                            className="svg-inline--fa fa-upload fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                            ></path>
                        </svg>
                        <span>Subir Imagen</span></label>
                </div>
                <button type="submit">
                    <h2>Agregar</h2>
                </button>
            </form >
        </section >
    )
}

export default AddPelicula