import React from 'react'
import {
    Navigate,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AddPelicula from "../components/AddPelicula";
import Favoritos from "../components/Favoritos";
import Home from "../components/Home";
import NavBar from '../components/NavBar';
import PeliculaDetail from "../components/PeliculaDetail";
import '../styles/index.scss'
import '../styles/navbar.scss'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddPelicula />} />
                <Route path="/fav" element={<Favoritos />} />
                <Route path="/detail/:nombre" element={<PeliculaDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter