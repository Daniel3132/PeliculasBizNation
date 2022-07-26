export const obtenerLocalStorage = () => {
    const favoritoStorage = localStorage.getItem('favorito')
    if (favoritoStorage === null) {
        return undefined
    }
    return JSON.parse(favoritoStorage)
}

export const guardarLocalStorage = (state) => {
    const favoritoState = JSON.stringify(state)
    localStorage.setItem('favorito', favoritoState)
}