import {Helmet} from "react-helmet";
import { useForm } from "react-hook-form";

import styles from "./CrearAntecedentesPage.module.css";

import { getAllAntecedentes } from "../../api/api";


export async function loader(){
  const antecedentes = (await getAllAntecedentes()).data;

  return({antecedentes});
}

export function CrearAntecedentesPage() {

    const { register: registerFormPersona, handleSubmit: handleSubmitFormPersona } = useForm();
    const { register: registerFormAntecedente, handleSubmit: handleSubmitFormAntecedente } = useForm();



    const onSubmitFormPersona=handleSubmitFormPersona(data=>{
      console.log(data);
    });
    const onSubmitFormAntecedente=handleSubmitFormAntecedente(data=>{
      console.log(data);
      console.log("a");
    });




    return (
      <>
        <Helmet>
                <title>Crear antecedentes</title>
        </Helmet>

        <div className={styles.crearAntecedentesContainer}>
          <div className={styles.contenedorPersona}>
            <div className={styles.persona}>
              <p>Persona</p>
              <input type="text" placeholder="DNI/Carnet extranjería" {...registerFormPersona("DNIcarnetextranjeria",{required:true})}></input>
              <input type="text" placeholder="Primer apellido" {...registerFormPersona("primerApellido",{required:true})}></input>
              <input type="text" placeholder="Segundo apellido" {...registerFormPersona("segundoApellido",{required:true})}></input>
              <input type="text" placeholder="Nombres" {...registerFormPersona("nombre",{required:true})}></input>
              <div>
                    <input type="text" placeholder="Certificado" disabled></input>
                    <div>
                      <button className={styles.buscarButtom} onClick={onSubmitFormPersona}>Buscar</button>
                    </div>
                    
              </div>
            </div>
          </div>
          

          <div className={styles.contenedorAntecedente}>
            <div className={styles.antecedente}>
              <p>Antecedente</p>
              <input type="text" placeholder="Código" {...registerFormAntecedente("codigo",{required:true})}></input>
              <input type="text" placeholder="Tipo" disabled {...registerFormAntecedente("tipo")}></input>
              <input type="text" placeholder="Título" {...registerFormAntecedente("titulo",{required:true})}></input>
              <input type="datetime-local" disabled {...registerFormAntecedente("fechahora")}></input>
              <textarea type="text" placeholder="Descripción" {...registerFormAntecedente("descripcion",{required:true})}></textarea>
              <button className={styles.crearButtom} onClick={onSubmitFormAntecedente} >Crear</button>
            </div>
          </div>
          
        </div>
      </>
    )
}