import ReactDOM from "react-dom/client";
import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import AddPelicula from "./components/AddPelicula";
import Favoritos from "./components/Favoritos";
import Home from "./components/Home";
import PeliculaDetail from "./components/PeliculaDetail";
import store from "./redux/store/store";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={store} >
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddPelicula />} />
      <Route path="/fav" element={<Favoritos />} />
      <Route path="/detail/:nombre" element={<PeliculaDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  </Provider>
);
