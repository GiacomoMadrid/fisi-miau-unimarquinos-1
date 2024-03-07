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
              <p>fecha</p>
              <h1>Certificado de antecedentes penales</h1>

              <div className={styles.datosContainer}>
                <div className={styles.datos}>
                  <p>DNI/Carnet de extranjería:72169219</p>
                  <p>Primer apellido: Jara</p>
                  <p>Segundo apellido: Espinoza</p>
                  <p>Nombres: Angela Lucia</p>
                </div>

                <div className={styles.userImageContainer}><img src={userImage}></img></div>
                
              </div>

              <Antecedente></Antecedente>
              <Antecedente></Antecedente>
              <p>Cambios realizados:aaaaaaaaaaaaaaa</p>
          </div> 

        </div>
      </>
    )
}