import {Helmet} from "react-helmet";

import styles from "./PerfilPage.module.css";
import userImage from "../../components/Certificado/images/userImage.svg";

export function PerfilPage() {


    return (
      <>
        <Helmet>
                <title>Perfil</title>
        </Helmet>
        
        <div className={styles.contentContainer}>
          <div className={styles.content}>
              <div className={styles.fotoPerfil}>
                <img src={userImage}></img>
              </div>
              <div className={styles.datos}>
                <p><span>DNI/Carnet de extranjería:</span> 72169219</p>
                <p><span>Primer Apellido:</span> Jara</p>
                <p><span>Segundo Apellido:</span> Espinoza</p>
                <p><span>Nombres:</span> Angela Lucia</p>
                <p><span>Estado civil:</span> Soltera</p>
                <p><span>Cargo:</span> Jueza</p>
                <p><span>Estado:</span> Activo</p>
              </div>
          </div>
        </div>
      </>
    )
}