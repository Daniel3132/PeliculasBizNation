import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navBar">
            <div>
                <Link to="/"><h1>PelisNation</h1></Link>
                <Link to="/add">Agregar Peliculas</Link>
                <Link to="/fav">Favoritos</Link>
            </div>
        </div>
    )
}

export default NavBar