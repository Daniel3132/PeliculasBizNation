import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { baseDatos } from "../../firebase/firebaseConfig"
import { typesPeliculas } from "../types/types"


// funcion agregar

export const addPelicula = (pelicula) => {
    return (dispatch) => {
        addDoc(collection(baseDatos, "peliculasBD"), pelicula)
            .then(resp => {
                dispatch(addPeliculaSync(pelicula))
            })
            .catch(error => {
                console.warn(error)
            })

    }
}

export const addPeliculaSync = (pelicula) => {
    return {
        type: typesPeliculas.add,
        payload: pelicula,
    }
}

//funcion listar
export const listPelicula = () => {
    return async (dispatch) => {
        const collectionTraer = await getDocs(collection(baseDatos, "peliculasBD"))
        const peliculas = []
        collectionTraer.forEach((doc) => {
            peliculas.push({
                ...doc.data()
            })
        })
        dispatch(listSync(peliculas))
    }
}

export const listSync = (pelicula) => {
    return {
        type: typesPeliculas.list,
        payload: pelicula
    }
}

//funcion borrar
export const delPelicula = (codigo) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "peliculasBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        traerDatosQ.forEach((docum => {
            deleteDoc(doc(baseDatos, "peliculasBD", docum.id))
        }))
        dispatch(delSync(codigo))
        dispatch(listPelicula())
    }
}

export const delSync = (codigo) => {
    return {
        type: typesPeliculas.delete,
        payload: codigo
    }
}


//funcion editar

export const editPelicula = (codigo, pelicula) => {
    return async (dispatch) => {
        const collectionTraer = collection(baseDatos, "peliculasBD")
        const q = query(collectionTraer, where("codigo", "==", codigo))
        const traerDatosQ = await getDocs(q)
        let id
        traerDatosQ.forEach(async (docu) => {
            id = docu.id
        })
        console.log(id);
        const documentRef = doc(baseDatos, "peliculasBD", id)
        await updateDoc(documentRef, pelicula)
            .then(resp => {
                dispatch(editSync(pelicula))
                console.log(resp);
            })
            .catch((err) => console.log(err))
        dispatch(listPelicula)
    }
}

export const editSync = (pelicula) => {
    return {
        type: typesPeliculas.editSync,
        payload: pelicula
    }
}
