import {Helmet} from "react-helmet";

import styles from "./ActualizarCertificadosPage.module.css";

import { getAllAntecedentes } from "../../api/api";


export async function loader(){
  const antecedentes = (await getAllAntecedentes()).data;

  return({antecedentes});
}


export function ActualizarCertificadosPage() {


    return (
      <>
        <Helmet>
                <title>Actualizar certificados</title>
        </Helmet>

        <div className={styles.actualizarCertificadoContainer}>
          <div className={styles.contenedorPersona}>
            <div className={styles.persona}>
              <p>Persona</p>
              <input type="text" placeholder="DNI/Carnet extranjería"></input>
              <input type="text" placeholder="Primer apellido"></input>
              <input type="text" placeholder="Segundo apellido"></input>
              <input type="text" placeholder="Nombres"></input>
              <div>
                    <input className={styles.certificado}type="text" placeholder="Certificado" disabled></input>
                    <div>
                      <button className={styles.buscarButtom}>Buscar</button>
                    </div>
                    
              </div>
            </div>
          </div>
          
          <div className={styles.contenedorCertificado}>
            <div className={styles.certificado}>
              <p>Certificado</p>
              <select>
                <option>Antecedente1</option>
                <option>Antecedente2</option>
              </select>
              <input type="text" placeholder="Codigo"></input>
              <input type="text" placeholder="Tipo" disabled></input>
              <input type="text" placeholder="Título"></input>
              <input type="datetime-local" disabled></input>
              <textarea type="text" placeholder="Descripción"></textarea>
              <textarea type="text" placeholder="Cambios realizados"></textarea>
              <div className={styles.buttons}><button>Eliminar</button><button>Actualizar</button></div>
            </div>
          </div>
          
        </div>
        
      </>
    )
}