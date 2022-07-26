import { typesPeliculas } from "../types/types";

const initialState = {
    peliculas: [],
}

export const peliculasReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesPeliculas.add:
            return {
                peliculas: [action.payload]
            }
        case typesPeliculas.list:
            return {
                peliculas: [...action.payload]
            }
        case typesPeliculas.edit:
            return {
                ...state
            }
        case typesPeliculas.delete:
            return {
                peliculas: state.peliculas.filter(prod => prod !== action.payload)
            }
        default:
            return state
    }
}