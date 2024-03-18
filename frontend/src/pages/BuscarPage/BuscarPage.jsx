import { Helmet } from "react-helmet";
import { HomePage } from "../HomePage/HomePage";

import styles from "./BuscarPage.module.css";
import { getAllAntecedentes, getAllCertificados, getAllHistorialCertificados, getAllPersonas } from "../../api/api";


export async function loader(){
    const certificados= (await getAllCertificados()).data;
    const antecedentes=(await getAllAntecedentes()).data;
    const personas=(await getAllPersonas()).data;
    const historialCertificados=(await getAllHistorialCertificados()).data;

    return({historialCertificados,certificados,antecedentes,personas});
}


export function BuscarPage(){

    
    
    
    return(
        <>
            <Helmet>
                <title>Buscar</title>
            </Helmet>

            <div className={styles.contenido}>
                <HomePage></HomePage>
            </div>
            
            
        </>
    )
}