import {Helmet} from "react-helmet";
import { useState,useEffect } from "react";

import styles from "./AntecedentesRegistradosPage.module.css";

import {Antecedente} from "../../components/Antecedente/Antecedente";
import { getAllAntecedentes } from "../../api/api";

export function AntecedentesRegistradosPage() {
    const [antecedentes,setAntecedentes]=useState([]);

    useEffect(()=>{

      async function fetchData() {
          try {
              const antecedentesResponse = await getAllAntecedentes();
              setAntecedentes(antecedentesResponse.data);

          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }

      fetchData();



  },[]);


    return (
      <>
        <Helmet>
                <title>Antecedentes registrados</title>
        </Helmet>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            {antecedentes.map(antecedente=>{
              <Antecedente key={antecedente.id} antecedente={antecedente}></Antecedente>
            })}
          </div>
        </div>
      </>
    )
}