import { createBrowserRouter} from "react-router-dom";

import {PerfilPage, loader as perfilLoader} from "./pages/PerfilPage/PerfilPage.jsx";
import {ActualizarCertificadosPage, loader as actualizarCertificadosLoader} from "./pages/ActualizarCertificadosPage/ActualizarCertificadosPage.jsx";
import {AntecedentesRegistradosPage, loader as antecedentesRegistradosLoader} from "./pages/AntecedentesRegistradosPage/AntecedentesRegistradosPage.jsx";
import {BuscarPage, loader as buscarLoader} from "./pages/BuscarPage/BuscarPage.jsx";
import {CrearAntecedentesPage, loader as crearAntecedentesLoader} from "./pages/CrearAntecedentesPage/CrearAntecedentesPage.jsx";
import {HomePage ,loader as homeLoader} from "./pages/HomePage/HomePage.jsx";
import {LoginPage,loader as loginLoader} from "./pages/LoginPage/LoginPage.jsx";


import {SideBar} from "./components/SideBar/SideBar.jsx";



export const router=createBrowserRouter([
  {
    path:"/",
    loader: homeLoader,
    element:<HomePage/>
  },
  {
    path:"/login",
    loader: loginLoader,
    element:<LoginPage/>
  },
  {
    path:"/:userID",
    element:<SideBar/>,
    children:[
      {
        path:"/:userID/perfil",
        loader: perfilLoader ,
        element:<PerfilPage/>
      },
      {
        path:"/:userID/antecedentes-registrados",
        loader:antecedentesRegistradosLoader,
        element:<AntecedentesRegistradosPage/>
      },
      {
        path:"/:userID/crear-antecedentes",
        loader:crearAntecedentesLoader,
        element:<CrearAntecedentesPage/>
      },
      {
        path:"/:userID/actualizar-certificados",
        loader:actualizarCertificadosLoader,
        element:<ActualizarCertificadosPage/> 
      },
      {
        path:"/:userID/buscar",
        loader:buscarLoader,
        element:<BuscarPage/>,
      }
    ]
  }
])

