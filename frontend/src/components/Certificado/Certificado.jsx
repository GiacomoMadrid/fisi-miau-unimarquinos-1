import styles from "./Certificado.module.css";
import {getTipoCertificado,getHistorialCertificado,getPersona} from "../../api/api";
import {getAllAntecedentes} from "../../api/api";

import decoration from "./images/Decoration.svg";
import userImage from "./images/userImage.svg";

import { Antecedente } from "../Antecedente/Antecedente";
import { useState ,useEffect} from "react";
import { useLoaderData } from "react-router-dom";



async function loader(){
  const antecedentes=(await getAllAntecedentes()).data;

  return({antecedentes});
}



export function Certificado({objetoCertificado}) {

  const dataApi=useLoaderData();
  const [certificado,setCertificado]=useState({});
  const [antecedentesFiltrados,setAntecedentesFiltrados]=useState([]);


  useEffect(()=>{

    async function fetchCertificadoData(){
      const tipoCertificado=(await getTipoCertificado(objetoCertificado.tipo)).data;
      const historialCertificado=(await getHistorialCertificado(objetoCertificado.historial)).data;
      const personaCertificado=(await getPersona(historialCertificado.duenno)).data;

      const dataCertificado={
        "version":objetoCertificado.version,
        "tipo":tipoCertificado.nombre,
        "descripcion":tipoCertificado.descripcion,
        "numeroDocumento":personaCertificado.numeroDocumento,
        "primerApellido":personaCertificado.primerApellido,
        "segundoApellido":personaCertificado.segundoApellido,
        "prenombres":personaCertificado.prenombres,
        "cambios":objetoCertificado.cambios,
      };
      setCertificado(dataCertificado);
    };


    function filterAntecedentes(){
      setAntecedentesFiltrados(dataApi.antecedentes.filter(antecedente=>antecedente.certificado==objetoCertificado.id));
    }

    fetchCertificadoData();
    filterAntecedentes();

  },[])
    
    return (
      <>
        <div className={styles.certificadoContainer}>

          <div className={styles.certificado}>
              <img className={styles.decoration}src={decoration}></img>
              <p className={styles.descripcion}>Version: {certificado.version}</p>
              <p className={styles.descripcion}>Descripcion: {certificado.descripcion}</p>
              <h1>{certificado.tipo}</h1>

              <div className={styles.datosContainer}>
                <div className={styles.datos}>
                  <p><span>DNI/Carnet de extranjería:</span>{certificado.numeroDocumento}</p>
                  <p><span>Primer apellido:</span>{certificado.primerApellido}</p>
                  <p><span>Segundo apellido:</span>{certificado.segundoApellido}</p>
                  <p><span>Prenombres:</span>{certificado.prenombres}</p>
                </div>

                <div className={styles.userImageContainer}><img src={userImage}></img></div>
                
              </div>
              {antecedentesFiltrados.map(antecedente=><Antecedente key={antecedente.id} objetoAntecedente={antecedente}></Antecedente>)}
              <p className={styles.infoAdicional}>Cambios realizados: {certificado.cambios}</p>
          </div> 

        </div>
      </>
    )
}