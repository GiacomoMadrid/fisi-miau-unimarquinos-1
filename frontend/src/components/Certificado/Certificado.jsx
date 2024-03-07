import styles from "./Certificado.module.css";

import decoration from "./images/Decoration.svg";
import userImage from "./images/userImage.svg";

import { Antecedente } from "../Antecedente/Antecedente";

export function Certificado() {


    return (
      <>
        <div className={styles.certificadoContainer}>

          <div className={styles.certificado}>
              <img className={styles.decoration}src={decoration}></img>
              <p className={styles.fecha}>fecha</p>
              <h1>Certificado de antecedentes penales</h1>

              <div className={styles.datosContainer}>
                <div className={styles.datos}>
                  <p><span>DNI/Carnet de extranjería:</span>72169219</p>
                  <p><span>Primer apellido:</span> Jara</p>
                  <p><span>Segundo apellido:</span> Espinoza</p>
                  <p><span>Nombres:</span> Angela Lucia</p>
                </div>

                <div className={styles.userImageContainer}><img src={userImage}></img></div>
                
              </div>

              <Antecedente></Antecedente>
              <Antecedente></Antecedente>
              <p className={styles.infoAdicional}>Cambios realizados:aaaaaaaaaaaaaaa</p>
              <p className={styles.infoAdicional}>Autor: Cargo Nombre</p>
          </div> 

        </div>
      </>
    )
}