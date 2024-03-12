import {Helmet} from "react-helmet";
import { useState,useEffect } from "react";

import styles from "./AntecedentesRegistradosPage.module.css";

import {Antecedente} from "../../components/Antecedente/Antecedente";
import { getAllAntecedentes } from "../../api/api";



export async function loader(){
    const antecedentes = (await getAllAntecedentes()).data;

    return({antecedentes});
}

export function AntecedentesRegistradosPage() {



    return (
      <>
        <Helmet>
                <title>Antecedentes registrados</title>
        </Helmet>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <Antecedente></Antecedente>
          </div>
        </div>
      </>
    )
}