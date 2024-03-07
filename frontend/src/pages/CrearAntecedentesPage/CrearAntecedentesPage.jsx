import {Helmet} from "react-helmet";

import styles from "./CrearAntecedentesPage.module.css";

export function CrearAntecedentesPage() {


    return (
      <>
        <Helmet>
                <title>Crear antecedentes</title>
        </Helmet>

        <div className={styles.crearAntecedentesContainer}>
          <div className={styles.persona}>
            <p>Persona</p>
            <input type="text" placeholder="DNI/Carnet extranjería"></input>
            <input type="text" placeholder="Primer apellido"></input>
            <input type="text" placeholder="Segundo apellido"></input>
            <input type="text" placeholder="Nombres"></input>
            <div>
                  <input type="text" placeholder="Certificado"></input>
                  <button>Buscar</button>
            </div>
          </div>
          <div className={styles.antecedente}>
            <p>Antecedente</p>
            <input type="text" placeholder="Código"></input>
            <input type="text" placeholder="Tipo"></input>
            <input type="text" placeholder="Título"></input>
            <input type="datetime-local" ></input>
            <textarea type="text" placeholder="Descripción"></textarea>
            <button>Crear</button>
          </div>
        </div>
      </>
    )
}