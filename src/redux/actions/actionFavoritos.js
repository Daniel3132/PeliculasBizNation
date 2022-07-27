import { typesFavorito } from "../types/types"


export const Crearfavoritos = (favorito) => {
    return {
        type: typesFavorito.crear,
        payload: favorito
    }
}
export const Eliminarfavoritos = (id) => {
    return {
        type: typesFavorito.eliminar,
        payload: id
    }
}
export const Editarfavoritos = (favoritoEdit) => {
    return {
        type: typesFavorito.editar,
        payload: favoritoEdit
    }
}
export const EliminarAll = () => {
    return {
        type: typesFavorito.eliminarAll
    }
}
export const Filtrarfavoritos = (estado) => {
    return {
        type: typesFavorito.filtrar,
        payload: estado
    }
}