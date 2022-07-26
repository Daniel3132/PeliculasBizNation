import { typesFavorito } from "../types/types"

const initialState = {
    favorito: []
}

export const favoritoReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesFavorito.crear:
            return {
                favorito: [...state.favorito, action.payload]
            }
        case typesFavorito.editar:
            return {
                ...state,
                favorito: state.favorito.map(pro => pro.codigo === action.payload.codigo ? action.payload : pro)
            }
        case typesFavorito.eliminar:
            return {
                favorito: state.favorito.filter(favorito => favorito.codigo !== action.payload)
            }
        case typesFavorito.eliminarAll:
            return {
                favorito: []
            }
        case typesFavorito.filtrar:
            return {
                favorito: state.favorito.filter(favorito => favorito.state === action.payload)
            }
        default:
            return state
    }
}