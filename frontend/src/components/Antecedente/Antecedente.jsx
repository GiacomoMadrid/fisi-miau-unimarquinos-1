import styles from "./Antecedente.module.css";

import userImage from "../Certificado/images/userImage.svg";

export function Antecedente({antecedente}) {

    return (
      <>
        <div className={styles.antecedenteContainer}>
          <div className={styles.antecedente}>
              <div className={styles.encabezado}>
                <p> {antecedente.nombre}/ {antecedente.fechaRegistro}</p>
              </div>
              <div className={styles.contenido}>

                <div className={styles.datosContainer}>

                  <div className={styles.datos}>
                    <p className={styles.tipoAntecedente}>Tipo Antecedente</p>
                    <p><span>DNI/Carnet de extranjería:</span>72169219</p>
                    <p><span>Primer apellido:</span> Jara</p>
                    <p><span>Segundo apellido:</span> Espinoza</p>
                    <p><span>Nombres: </span>Angela Lucia</p>
                    <p><span>Descripción:{antecedente.descripcion}</span> </p>
                  </div>

                  <div className={styles.userImageContainer}><img src={userImage}></img></div>
                  
                </div>
              </div>
          </div>
        </div>
      </>
    )
}