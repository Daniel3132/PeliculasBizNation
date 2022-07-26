import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { peliculasReducers } from "../reducers/peliculasReducers";
import { guardarLocalStorage, obtenerLocalStorage } from "../../helpers/LocalStorage";
import { favoritoReducers } from "../reducers/favoritoReducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const storageState = obtenerLocalStorage()

const reducersEnviar = combineReducers({
    peliculas: peliculasReducers,
    favorito: favoritoReducers
})

const store = createStore(
    reducersEnviar,
    storageState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

//para enviar cada vez que el estado cambie si
//el arbol de estados cambia
store.subscribe(()=>{
    guardarLocalStorage({
        favorito: store.getState().favorito
    })
})

export default store