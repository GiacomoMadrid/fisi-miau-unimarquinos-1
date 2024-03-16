import {Helmet} from "react-helmet";

import styles from "./PerfilPage.module.css";
import userImage from "../../components/Certificado/images/userImage.svg";
import logo from "../LoginPage/images/logo.png";

import { getAllAntecedentes, getPersona, getUsuario } from "../../api/api";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


export async function loader(){
  const antecedentes = (await getAllAntecedentes()).data;

  return({antecedentes});
}

export function PerfilPage() {
  const idUsuario=(useParams()).userID;
  const [datosPerfil,setDatosPerfil]=useState({});


    useEffect(()=>{
      async function setPerfil(){
        const usuario=(await getUsuario(idUsuario)).data;
        const persona=(await getPersona(usuario.datos)).data;

        setDatosPerfil(
          {
            "cargo":usuario.cargo,
            "numeroDocumento":persona.numeroDocumento,
            "estadoCivil":persona.estadoCivil,
            "prenombres":persona.prenombres,
            "primerApellido":persona.primerApellido,
            "segundoApellido":persona.segundoApellido
          }
        );
      }

      setPerfil();

    },[]);

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
                <p><span>DNI/Carnet de extranjería:</span> {datosPerfil.numeroDocumento}</p>
                <p><span>Primer Apellido:</span> {datosPerfil.primerApellido}</p>
                <p><span>Segundo Apellido:</span> {datosPerfil.segundoApellido}</p>
                <p><span>Nombres:</span> {datosPerfil.prenombres}</p>
                <p><span>Estado civil:</span> {datosPerfil.estadoCivil=="S"?"Soltero/a":(datosPerfil.estadoCivil=="C"?"Casado/a":(datosPerfil.estadoCivil=="D"?"Divorciado/a":"Viudo/a"))}</p>
                <p><span>Cargo:</span> {datosPerfil.cargo}</p>
                <p><span>Estado:</span> Activo</p>
              </div>
              <img className={styles.logo} src={logo}></img>
          </div>
        </div>
      </>
    )
}