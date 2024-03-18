import styles from "./Certificado.module.css";
import {getTipoCertificado,getHistorialCertificado,getPersona, getCertificado} from "../../api/api";
import {getAllAntecedentes} from "../../api/api";

import decoration from "./images/Decoration.svg";
import userImage from "./images/userImage.svg";

import { Antecedente } from "../Antecedente/Antecedente";
import { useState ,useEffect} from "react";
import { useLoaderData } from "react-router-dom";







export function Certificado({objetoCertificado}) {

  const dataApi=useLoaderData();
  const [certificado,setCertificado]=useState({});
  const [antecedentesMostrados,setAntecedentesMostrados]=useState([]);


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


    async function filterAntecedentes(){
      const historialCertificadoActual=(await getHistorialCertificado(objetoCertificado.historial)).data;
      const antecedentesFiltrados=[];

      for(const antecedente of dataApi.antecedentes){
        const certificado=(await getCertificado(antecedente.certificado)).data;
        const historialCertificado=(await getHistorialCertificado(certificado.historial)).data;  

        if(historialCertificadoActual.id==historialCertificado.id&&objetoCertificado.version>=certificado.version){
          antecedentesFiltrados.push(antecedente);
        }
      }

      setAntecedentesMostrados(antecedentesFiltrados);
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
              {antecedentesMostrados.map(antecedente=><Antecedente key={antecedente.id} objetoAntecedente={antecedente}></Antecedente>)}
              <p className={styles.infoAdicional}>Cambios realizados: {certificado.cambios}</p>
          </div> 

        </div>
      </>
    )
}