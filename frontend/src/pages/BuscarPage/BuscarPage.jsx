import {Helmet} from "react-helmet";

import styles from "./BuscarPage.module.css";
import {HomePage} from "../HomePage/HomePage";

export function BuscarPage() {


    return (
      <>
        <Helmet>
                  <title>Buscar</title>
        </Helmet>
        <div className={styles.HomePageContainer}>
          <HomePage></HomePage>
        </div>
        
      </>
    )
}