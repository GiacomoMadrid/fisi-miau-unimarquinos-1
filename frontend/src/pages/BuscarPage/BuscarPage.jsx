import {Helmet} from "react-helmet";
import {Link,useLoaderData} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";

import Logo from "../HomePage/images/Logo.svg";
import styles from "./BuscarPage.module.css";

import {Certificado} from "../../components/Certificado/Certificado";
import {Antecedente} from "../../components/Antecedente/Antecedente";
import {getAllAntecedentes,getAllCertificados,getAllTipoAntecedentes,getAllHistorialCertificados,getAllPersonas, getPersona} from "../../api/api.js";
import {getCertificado,getHistorialCertificado} from "../../api/api.js";


export async function loader(){
    const certificados= (await getAllCertificados()).data;

    return({certificados});
}

export function BuscarPage(){

    const dataApi=useLoaderData();

    const { register: registerFormDatosPersonales, handleSubmit: handleSubmitFormDatosPersonales } = useForm();
    const { register: registerFormAntecedente, handleSubmit: handleSubmitFormAntecedente } = useForm();

    const [datosDisabled,setDatosDisabled]=useState([]);
    const [antecedentesDisabled,setAntecedentesDisabled]=useState([]);
    const [selectedOption, setSelectedOption] = useState("datosPersonales");


    useEffect(()=>{
        function checkTipoBusqueda(){
            if(selectedOption=="antecedentes"){
                setDatosDisabled(true);
                setAntecedentesDisabled(false);
            }
            else{
                setAntecedentesDisabled(true);
                setDatosDisabled(false);
            }
        }

        
        checkTipoBusqueda();


    },[selectedOption]);

    
    
    return(
        <>
            <Helmet>
                <title>OpenJustice</title>
            </Helmet>

            

            <div className={styles.contentContainer}>

                <aside className={styles.sideBarContainer}>
                    <div className={styles.tipoBusqueda}>Datos personales <input type="radio" name="tipoBusqueda" defaultChecked
                    value="datosPersonales" 
                    onChange={() => setSelectedOption("datosPersonales")}></input>
                    </div> 
                    <input type="text" 
                    placeholder="Primer apellido"
                    disabled={datosDisabled}
                    {...registerFormDatosPersonales("primerApellido")}
                    ></input>

                    <input type="text" 
                    placeholder="Segundo apellido"
                    disabled={datosDisabled}
                    {...registerFormDatosPersonales("segundoApellido")}
                    ></input>

                    <input type="text" 
                    placeholder="Nombre"
                    disabled={datosDisabled}
                    {...registerFormDatosPersonales("prenombres")}
                    ></input>

                    <input type="text" 
                    placeholder="DNI/Carnet de extranjería"
                    disabled={datosDisabled}
                    {...registerFormDatosPersonales("numeroDocumento")}
                    ></input>



                    <div className={styles.tipoBusqueda}>Antecedente<input type="radio" name="tipoBusqueda"
                    value="antecedentes" 
                    onChange={() => setSelectedOption("antecedentes")}></input>
                    </div> 
                    <input type="text" 
                    placeholder="Departamento"
                    disabled={antecedentesDisabled}
                    {...registerFormAntecedente("departamento")}
                    ></input>

                    <input type="text" 
                    placeholder="Provincia"
                    disabled={antecedentesDisabled}
                    {...registerFormAntecedente("provincia")}
                    ></input>

                    <input type="text" 
                    placeholder="Distrito"
                    disabled={antecedentesDisabled}
                    {...registerFormAntecedente("distrito")}
                    ></input>

                    <p>Periodo</p>
                    <div>
                        <input type="date"
                        {...registerFormAntecedente("inicio-periodo")}
                        disabled={antecedentesDisabled}>
                        </input> 

                        <input type="date"
                        {...registerFormAntecedente("final-periodo")}
                        disabled={antecedentesDisabled}>    
                        </input>
                    </div>

                    <input type="text" 
                    placeholder="Tipo de antecedente"
                    {...registerFormAntecedente("tipoAntecedente")}
                    disabled={antecedentesDisabled}
                    ></input>

                    <button type="submit" >Buscar</button>
                </aside>

                <div className={styles.content}>
                    <header className={styles.header}>
                        <img src={Logo}></img>
                    </header>
                    
                    <div className={styles.items}>
                        <Certificado></Certificado>
                        
                        
                        <Link to="/login"><p className={styles.loginButtom}>Login</p></Link> 
                    </div>
                          
                </div>

            </div>
            
        </>
    )
}