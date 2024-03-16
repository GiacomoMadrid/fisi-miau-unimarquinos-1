import {Helmet} from "react-helmet";
import { useState,useEffect } from "react";

import styles from "./AntecedentesRegistradosPage.module.css";

import {Antecedente} from "../../components/Antecedente/Antecedente";
import { getAllAntecedentes } from "../../api/api";
import { useLoaderData, useParams } from "react-router-dom";



export async function loader(){
    const antecedentes = (await getAllAntecedentes()).data;

    return({antecedentes});
}


export function AntecedentesRegistradosPage() {

  const dataApi=useLoaderData();
  const idUsuario=(useParams()).userID;
  const [antecedentesMostrados,setAntecedentesMostrados]=useState([]);


  useEffect(()=>{

    async function filtrarAntecedentes(){
      setAntecedentesMostrados(dataApi.antecedentes.filter((antecedente)=>antecedente.usuarioRegistrador==idUsuario));
    }

    filtrarAntecedentes();
  },[]);
  

    return (
      <>
        <Helmet>
                <title>Antecedentes registrados</title>
        </Helmet>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            {antecedentesMostrados.map(antecedente=><Antecedente key={antecedente.id} objetoAntecedente={antecedente}></Antecedente>)}
          </div>
        </div>
      </>
    )
}