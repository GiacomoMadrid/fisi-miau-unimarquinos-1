import styles from "./Antecedente.module.css";

import userImage from "../Certificado/images/userImage.svg";

export function Antecedente() {


    return (
      <>
        <div className={styles.antecedenteContainer}>
          <div className={styles.antecedente}>
              <div className={styles.encabezado}>
                <p>titulo/fecha</p>
              </div>
              <div className={styles.contenido}>

                <div className={styles.datosContainer}>

                  <div className={styles.datos}>
                    <p className={styles.tipoAntecedente}>Tipo Antecedente</p>
                    <p>DNI/Carnet de extranjería:72169219</p>
                    <p>Primer apellido: Jara</p>
                    <p>Segundo apellido: Espinoza</p>
                    <p>Nombres: Angela Lucia</p>
                    <p>Descripción: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                  </div>

                  <div className={styles.userImageContainer}><img src={userImage}></img></div>
                  
                </div>
              </div>
          </div>
        </div>
      </>
    )
}