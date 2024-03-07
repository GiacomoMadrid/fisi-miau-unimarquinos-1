import {Helmet} from "react-helmet";

import styles from "./AntecedentesRegistradosPage.module.css";

import {Antecedente} from "../../components/Antecedente/Antecedente";
export function AntecedentesRegistradosPage() {


    return (
      <>
        <Helmet>
                <title>Antecedentes registrados</title>
        </Helmet>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
           <Antecedente></Antecedente> 
           <Antecedente></Antecedente> 
           <Antecedente></Antecedente> 
          </div>
        </div>
      </>
    )
}