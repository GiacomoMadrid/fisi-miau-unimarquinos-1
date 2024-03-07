import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

import {PerfilPage} from "./pages/PerfilPage/PerfilPage.jsx";
import {ActualizarCertificadosPage} from "./pages/ActualizarCertificadosPage/ActualizarCertificadosPage.jsx";
import {AntecedentesRegistradosPage} from "./pages/AntecedentesRegistradosPage/AntecedentesRegistradosPage.jsx";
import {BuscarPage} from "./pages/BuscarPage/BuscarPage.jsx";
import {CrearAntecedentesPage} from "./pages/CrearAntecedentesPage/CrearAntecedentesPage.jsx";
import {HomePage} from "./pages/HomePage/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage/LoginPage.jsx";


import {SideBar} from "./components/SideBar/SideBar.jsx";



export default function App() {


  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/perfil" element={<><SideBar /> <PerfilPage/></>}/> 
        <Route path="/antecedentes-registrados" element={<><SideBar /> <AntecedentesRegistradosPage/></>}/> 
        <Route path="/crear-antecedentes" element={<><SideBar /> <CrearAntecedentesPage/></>}/> 
        <Route path="/actualizar-certificados" element={<><SideBar /> <ActualizarCertificadosPage/></>}/> 
        <Route path="/buscar" element={<><SideBar /> <BuscarPage/></>}/> 
      </Routes>
    </BrowserRouter>
  )
}


