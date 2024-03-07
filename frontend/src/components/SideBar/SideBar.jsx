import {Link} from "react-router-dom";

import actualizarCertificadosIcon from "./images/ActualizarCertificadosIcon.svg";
import antecedentesRegistradosIcon from "./images/AntecedentesRegistradosIcon.svg";
import buscarIcon from "./images/BuscarIcon.svg";
import crearAntecedenteIcon from "./images/CrearAntecedenteIcon.svg";
import perfilIcon from "./images/PerfilIcon.svg";
import salirIcon from "./images/SalirIcon.svg";

import styles from "./SideBar.module.css";

export function SideBar() {


    return (
      <>
        <aside className={styles.sideBarContainer}>
          <Link to="/perfil">
            <div>
              <img src={perfilIcon}></img>
              <span>Perfil</span>
            </div>
          </Link>
          <Link to="/antecedentes-registrados">
            <div>
                <img src={antecedentesRegistradosIcon}></img>
                <span>Antecedentes registrados</span>
            </div>
          </Link>            
          <Link to="/crear-antecedentes">
            <div>
              <img src={crearAntecedenteIcon}></img>
              <span>Crear Antecedentes</span>
            </div>
          </Link>
          <Link to="/actualizar-certificados">
            <div>
              <img src={actualizarCertificadosIcon}></img>
              <span>Actualizar Certificados</span>
            </div>
          </Link>
          <Link to="/buscar">
            <div>
              <img src={buscarIcon}></img>
              <span>Buscar</span>
            </div>
          </Link>
          <Link to="/">
            <div>
              <img src={salirIcon}></img>
            </div>
          </Link>
          
        </aside>
      </>
    )
  }
  