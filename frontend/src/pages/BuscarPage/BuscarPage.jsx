import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";

import Logo from "../HomePage/images/Logo.svg";
import styles from "../BuscarPage/BuscarPage.module.css";

import {Certificado} from "../../components/Certificado/Certificado";
import {Antecedente} from "../../components/Antecedente/Antecedente";



export function BuscarPage() {
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

    
    const onSubmitFormDatosPersonales=handleSubmitFormDatosPersonales(data=>{
        
        console.log(data);
    });
    const onSubmitFormAntecedente=handleSubmitFormAntecedente(data=>{
        
        console.log(data);
    });

    return (
      <>
        <Helmet>
                  <title>Buscar</title>
        </Helmet>
        <div className={styles.HomePageContainer}>

          <div className={styles.contentContainer}>

            <aside className={styles.sideBarContainer}>
                <div className={styles.tipoBusqueda}>Datos personales <input type="radio" name="tipoBusqueda" defaultChecked
                value="datosPersonales" {...registerFormDatosPersonales("tipoBusqueda")}
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
                {...registerFormDatosPersonales("nombre")}
                ></input>

                <input type="text" 
                placeholder="DNI/Carnet de extranjería"
                disabled={datosDisabled}
                {...registerFormDatosPersonales("dni-carnetExtranjeria")}
                ></input>



                <div className={styles.tipoBusqueda}>Antecedente<input type="radio" name="tipoBusqueda"
                value="antecedentes" {...registerFormAntecedente("tipoBusqueda")}
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

                <button type="submit" onClick={selectedOption=="antecedentes"?onSubmitFormAntecedente:onSubmitFormDatosPersonales}>Buscar</button>
            </aside>

            <div className={styles.content}>
                <header className={styles.header}>
                    <img src={Logo}></img>
                </header>
                
                <div className={styles.items}>
                    <Certificado></Certificado>
                    <Certificado></Certificado>
                    <Antecedente></Antecedente>
                    <Antecedente></Antecedente>
                    
                    <Link to="/login"><p className={styles.loginButtom}>Login</p></Link> 
                </div>
                      
            </div>

          </div>
      </div>
        
      </>
    )
}