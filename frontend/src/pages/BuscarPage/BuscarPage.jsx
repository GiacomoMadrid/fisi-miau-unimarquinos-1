import { Helmet } from "react-helmet";
import { HomePage } from "../HomePage/HomePage";

import styles from "./BuscarPage.module.css";

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