import {Link, Outlet, useParams} from "react-router-dom";
import { useState } from "react";

import actualizarCertificadosIcon from "./images/ActualizarCertificadosIcon.svg";
import antecedentesRegistradosIcon from "./images/AntecedentesRegistradosIcon.svg";
import buscarIcon from "./images/BuscarIcon.svg";
import crearAntecedenteIcon from "./images/CrearAntecedenteIcon.svg";
import perfilIcon from "./images/PerfilIcon.svg";
import salirIcon from "./images/SalirIcon.svg";

import styles from "./SideBar.module.css";

export function SideBar() {

    const {userID}=useParams();
    const [clickedItem, setClickedItem] = useState("antecedentes-registrados");

    function handleClick (item) {
      setClickedItem(item);
    };

    return (
      <>
        <aside className={styles.sideBarContainer}>
          <Link to={`/${userID}/perfil`} onClick={() => handleClick("perfil")}>
            <div className={clickedItem=="perfil"?styles.clickedDiv:""}>
              <img className={styles.firstImg} src={perfilIcon}></img>
              <span>Perfil</span>
            </div>
          </Link>
          <Link to={`/${userID}/antecedentes-registrados`} onClick={() => handleClick("antecedentes-registrados")}>
            <div className={clickedItem=="antecedentes-registrados"?styles.clickedDiv:""}>
                <img src={antecedentesRegistradosIcon}></img>
                <span>Antecedentes <br/>registrados</span>
            </div>
          </Link>            
          <Link to={`/${userID}/crear-antecedentes`} onClick={() => handleClick("crear-antecedentes")}>
            <div className={clickedItem=="crear-antecedentes"?styles.clickedDiv:""}>
              <img src={crearAntecedenteIcon}></img>
              <span>Crear <br/>Antecedente</span>
            </div>
          </Link>
          <Link to={`/${userID}/actualizar-certificados`} onClick={() => handleClick("actualizar-certificados")}>
            <div className={clickedItem=="actualizar-certificados"?styles.clickedDiv:""}>
              <img src={actualizarCertificadosIcon}></img>
              <span>Actualizar <br/>Certificado</span>
            </div>
          </Link>
          <Link to={`/${userID}/buscar`} onClick={() => handleClick("buscar")}>
            <div className={clickedItem=="buscar"?styles.clickedDiv:""}>
              <img src={buscarIcon}></img>
              <span>Buscar</span>
            </div>
          </Link>
          <Link to="/">
            <div className={styles.lastDiv}>
              <img src={salirIcon}></img>
            </div>
          </Link>
          
        </aside>
        
        <Outlet></Outlet>
      </>
    )
  }
  