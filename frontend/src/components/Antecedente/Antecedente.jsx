import styles from "./Antecedente.module.css";

import userImage from "../Certificado/images/userImage.svg";
import { getCertificado, getDepartamento, getDistrito, getHistorialCertificado, getPersona, getProvincia, getTipoAntecedente, getUsuario } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";

export function Antecedente({objetoAntecedente}) {

  const [antecedente,setAntecedente]=useState({});

  useEffect(()=>{

    async function fetchAntecedenteData(){
      const tipoAntecedente=(await getTipoAntecedente(objetoAntecedente.tipo)).data;
      const departamento=(await getDepartamento(objetoAntecedente.departamento)).data;
      const provincia=(await getProvincia(objetoAntecedente.provincia)).data;
      const distrito=(await getDistrito(objetoAntecedente.distrito)).data;

      const autor=(await getUsuario(objetoAntecedente.usuarioRegistrador)).data;
      const personaAutor=(await getPersona(autor.datos)).data;

      const certificado=(await getCertificado(objetoAntecedente.certificado)).data;
      const historialCertificado=(await getHistorialCertificado(certificado.historial)).data;
      const personaCertificado=(await getPersona(historialCertificado.duenno)).data;

      const dataAntecedente={
        "nombre":objetoAntecedente.nombre,
        "fecha":objetoAntecedente.fechaRegistro,
        "tipo":tipoAntecedente.nombre,
        "numeroDocumento":personaCertificado.numeroDocumento,
        "primerApellido":personaCertificado.primerApellido,
        "segundoApellido":personaCertificado.segundoApellido,
        "prenombres":personaCertificado.prenombres,
        "autorNombre":`${personaAutor.prenombres} ${personaAutor.primerApellido} ${personaAutor.segundoApellido}`,
        "autorCargo":autor.cargo,
        "descripcion":objetoAntecedente.descripcion,
        "lugar":`${distrito.nombre}, ${provincia.nombre}, ${departamento.nombre}`
      };
      setAntecedente(dataAntecedente);
    };

    fetchAntecedenteData();

  },[])

    return (
      <>
        <div className={styles.antecedenteContainer}>
          <div className={styles.antecedente}>
              <div className={styles.encabezado}>
                <p> {antecedente.nombre}    /    {antecedente.fecha}</p>
              </div>
              <div className={styles.contenido}>

                <div className={styles.datosContainer}>

                  <div className={styles.datos}>
                    <p className={styles.tipoAntecedente}>{antecedente.tipo}</p>
                    <p><span>Autor:</span> {antecedente.autorCargo} {antecedente.autorNombre}</p>
                    <p><span>Lugar:</span> {antecedente.lugar} .</p>
                    <p><span>DNI/Carnet de extranjería:</span>{antecedente.numeroDocumento}</p>
                    <p><span>Primer apellido:</span> {antecedente.primerApellido}</p>
                    <p><span>Segundo apellido:</span> {antecedente.segundoApellido}</p>
                    <p><span>Nombres: </span>{antecedente.prenombres}</p>
                    <p><span>Descripción:</span> {antecedente.descripcion}</p>
                  </div>

                  <div className={styles.userImageContainer}><img src={userImage}></img></div>
                  
                </div>
              </div>
          </div>
        </div>
      </>
    )
}