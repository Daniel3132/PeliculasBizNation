import { typesFavorito } from "../types/types"

const initialState = {
    favorito: []
}

export const favoritoReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesFavorito.crear:
            let peliRepetida = state.favorito.find(favorito => favorito.codigo === action.payload.codigo)
            if ( action.payload.codigo === peliRepetida?.codigo) {
                return {
                    favorito: [...state.favorito]
                }
            } else {
                return {
                    favorito: [...state.favorito, action.payload]
                    
                }
            }
        case typesFavorito.editar:
            return {
                ...state,
                favorito: state.favorito.map(peli => peli.codigo === action.payload.codigo ? action.payload : peli)
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