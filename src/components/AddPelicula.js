import React from 'react'
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
        <div>
            <form onSubmit={handleSubmit} className="addForm">
                <h1>Agregar Producto</h1>
                <div>
                    <input type="text" name="titulo" placeholder="titulo" value={titulo} onChange={handleInputChange} required autoFocus />
                    <input type="text" name="descripcion" placeholder="Descripcion" value={descripcion} onChange={handleInputChange} required />
                    <input type="date" name="fecha" placeholder="fecha" value={fecha} onChange={handleInputChange} required />


                    <select type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={handleInputChange} required>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>

                    </select>


                    <input type="file" name="imagen" placeholder="Ingrese imagen.jpg" onChange={handleFileChange} required />
                </div>
                <button type="submit">
                    <h2>Agregar</h2>
                </button>
            </form >
        </div >
    )
}

export default AddPelicula