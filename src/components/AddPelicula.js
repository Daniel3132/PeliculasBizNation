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
            text: 'Modal with a custom image.',
            imageUrl: values.imagen,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
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
            timer: 1500
        })
    }

    return (
        <section id='addFormCont'>
            <form onSubmit={handleSubmit} className="addForm">
                <h3>Agregar Película</h3>
                <div>
                    <input type="text" name="titulo" placeholder="titulo" value={titulo} onChange={handleInputChange} required autoFocus />
                    <textarea type="text" rows="4" cols="50" name="descripcion" placeholder="Descripcion" value={descripcion} onChange={handleInputChange} required />

                    <div style={{flexDirection: 'row', width:"80%"}}>
                        <input type="date" name="fecha" placeholder="fecha" value={fecha} onChange={handleInputChange} required />

                        <select type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={handleInputChange} required>
                            <option disabled>Categoria</option>
                            <option value="accion">Acción</option>
                            <option value="anime">Anime</option>
                            <option value="crimen">Crimen</option>
                            <option value="superHeroes">SuperHeroes</option>
                            <option value="terror">Terror</option>
                        </select>
                    </div>
                    <input className='inputFile' type="file" name="imagen" placeholder="Ingrese imagen.jpg" onChange={handleFileChange} required />
                </div>
                <button type="submit">
                    <h2>Agregar</h2>
                </button>
            </form >
        </section >
    )
}

export default AddPelicula