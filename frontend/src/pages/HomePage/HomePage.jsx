import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

import Logo from "./images/Logo.svg";
import styles from "./HomePage.module.css";

import {Certificado} from "../../components/Certificado/Certificado";
import {Antecedente} from "../../components/Antecedente/Antecedente";

export function HomePage(){
    
    return(
        <>
            <Helmet>
                <title>OpenJustice</title>
            </Helmet>

            

            <div className={styles.contentContainer}>

                <aside className={styles.sideBarContainer}>
                    <div>Datos personales <input type="radio" name="tipoBusqueda"></input></div> 
                    <input type="text" placeholder="Primer apellido"></input>
                    <input type="text" placeholder="Segundo apellido"></input>
                    <input type="text" placeholder="Nombre"></input>
                    <input type="text" placeholder="DNI/Carnet de extranjería"></input>

                    <div>Antecedentes<input type="radio" name="tipoBusqueda"></input></div> 
                    <input type="text" placeholder="Departamento"></input>
                    <input type="text" placeholder="Provincia"></input>
                    <input type="text" placeholder="Distrito"></input>
                    <p>Periodo</p>
                    <div><input type="date"></input> <input type="date"></input></div>
                    <input type="text" placeholder="Tipo de antecedente"></input>

                    <button type="submit">Buscar</button>
                </aside>

                <div className={styles.content}>
                    <header className={styles.header}>
                        <img src={Logo}></img>
                    </header>
                    
                    <div className={styles.items}>
                        <Certificado></Certificado>
                        <Antecedente></Antecedente>
                        <Antecedente></Antecedente>
                        
                        <Link to="/login"><p>Login</p></Link> 
                    </div>
                          
                </div>

            </div>
            
        </>
    )
}