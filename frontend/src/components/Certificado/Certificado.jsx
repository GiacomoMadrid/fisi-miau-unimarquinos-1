import styles from "./Certificado.module.css";
import {getTipoCertificado,getHistorialCertificado,getPersona} from "../../api/api";
import {getAllAntecedentes} from "../../api/api";

import decoration from "./images/Decoration.svg";
import userImage from "./images/userImage.svg";

import { Antecedente } from "../Antecedente/Antecedente";
import { useState ,useEffect} from "react";

export function Certificado({elementoMostrado}) {

    const [historial,setHistorial]=useState([]);
    const [tipoCertificado,setTipoCertificado]=useState([]);
    const [persona,setPersona]=useState([]);
    const [antecedentes,setAntecedentes]=useState([]);

    const [antecedentesFiltrados,setAntecedentesFiltrados]=useState([]);

    useEffect(() => {

      async function fetchData(){
        const tipoElementoResponse=await getTipoCertificado(elementoMostrado.tipo);     
        setTipoCertificado(tipoElementoResponse.data);

        const historialResponse=await getHistorialCertificado(elementoMostrado.historial);     
        setHistorial(historialResponse.data);

        const personaResponse=await getPersona(historial.duenno);
        setPersona(personaResponse.data);

        const antecedentesResponse=await getAllAntecedentes();
        setAntecedentes(antecedentesResponse.data);
      }


      function filtrarAntecedentes(){
        setAntecedentesFiltrados(
          antecedentes.filter(antecedente=>{
            return antecedente.certificado==elementoMostrado.id;
          })
        );
        
      }

      fetchData();
      filtrarAntecedentes();
      
    },[ antecedentesFiltrados]);


    
    return (
      <>
        <div className={styles.certificadoContainer}>

          <div className={styles.certificado}>
              <img className={styles.decoration}src={decoration}></img>
              <p className={styles.fecha}>fecha</p>
              <h1>{tipoCertificado.nombre}</h1>

              <div className={styles.datosContainer}>
                <div className={styles.datos}>
                  <p><span>DNI/Carnet de extranjería:</span>{persona.numeroDocumento}</p>
                  <p><span>Primer apellido:</span>{persona.primerApellido}</p>
                  <p><span>Segundo apellido:</span>{persona.segundoApellido}</p>
                  <p><span>Nombres:</span>{persona.prenombres}</p>
                </div>

                <div className={styles.userImageContainer}><img src={userImage}></img></div>
                
              </div>

              {antecedentesFiltrados.map(antecedenteFiltrado=>(
                <Antecedente key={antecedenteFiltrado.id} antecedente={antecedenteFiltrado}></Antecedente>
                
              ))}
              <p className={styles.infoAdicional}>Cambios realizados:{elementoMostrado.cambios}</p>
              <p className={styles.infoAdicional}>Autor: Cargo Nombre</p>
          </div> 

        </div>
      </>
    )
}