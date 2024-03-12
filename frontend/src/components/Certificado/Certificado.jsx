import styles from "./Certificado.module.css";
import {getTipoCertificado,getHistorialCertificado,getPersona} from "../../api/api";
import {getAllAntecedentes} from "../../api/api";

import decoration from "./images/Decoration.svg";
import userImage from "./images/userImage.svg";

import { Antecedente } from "../Antecedente/Antecedente";
import { useState ,useEffect} from "react";

export function Certificado() {


    
    return (
      <>
        <div className={styles.certificadoContainer}>

          <div className={styles.certificado}>
              <img className={styles.decoration}src={decoration}></img>
              <p className={styles.fecha}>fecha</p>
              <h1>tipoCertificado</h1>

              <div className={styles.datosContainer}>
                <div className={styles.datos}>
                  <p><span>DNI/Carnet de extranjería:</span>numeroDocumento</p>
                  <p><span>Primer apellido:</span>primerApellido</p>
                  <p><span>Segundo apellido:</span>segundoApellido</p>
                  <p><span>Nombres:</span>prenombres</p>
                </div>

                <div className={styles.userImageContainer}><img src={userImage}></img></div>
                
              </div>


              <p className={styles.infoAdicional}>Cambios realizados:cambios</p>
              <p className={styles.infoAdicional}>Autor: Cargo Nombre</p>
          </div> 

        </div>
      </>
    )
}