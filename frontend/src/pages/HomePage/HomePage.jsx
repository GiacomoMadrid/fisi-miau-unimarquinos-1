import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";

import Logo from "./images/Logo.svg";
import styles from "./HomePage.module.css";

import {Certificado} from "../../components/Certificado/Certificado";
import {Antecedente} from "../../components/Antecedente/Antecedente";
import {getAllAntecedentes,getAllCertificados,getAllTipoAntecedentes,getAllHistorialCertificados,getAllPersonas, getPersona} from "../../api/api.js";
import {getCertificado,getHistorialCertificado} from "../../api/api.js";


export function HomePage(){

    const { register: registerFormDatosPersonales, handleSubmit: handleSubmitFormDatosPersonales } = useForm();
    const { register: registerFormAntecedente, handleSubmit: handleSubmitFormAntecedente } = useForm();

    const [datosDisabled,setDatosDisabled]=useState([]);
    const [antecedentesDisabled,setAntecedentesDisabled]=useState([]);
    const [selectedOption, setSelectedOption] = useState("datosPersonales");
    const[elementosMostrados,setElementosMostrados]=useState([]);

    const [antecedentes,setAntecedentes]=useState([]);
    const [certificados,setCertificados]=useState([]);
    const [tipoAntecedentes,setTipoAntecedentes]=useState([]);
    const [historialCertificados,setHistorialCertificados]=useState([]);
    const [personas,setPersonas]=useState([]);


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

        async function fetchData() {
            try {
                const antecedentesResponse = await getAllAntecedentes();
                setAntecedentes(antecedentesResponse.data);

                const certificadosResponse = await getAllCertificados();
                setCertificados(certificadosResponse.data);

                const tipoAntecedenteResponse=await getAllTipoAntecedentes();
                setTipoAntecedentes(tipoAntecedenteResponse.data);

                const historialCertificadosResponse=await getAllHistorialCertificados();
                setHistorialCertificados(historialCertificadosResponse.data);

                const personasResponse=await getAllPersonas();
                setPersonas(personasResponse.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
        checkTipoBusqueda();
        console.log(elementosMostrados);


    },[selectedOption,elementosMostrados]);

    
    const onSubmitFormDatosPersonales=handleSubmitFormDatosPersonales(async data=>{
        
        setElementosMostrados(certificados.filter(async (certificado)=>{
            if(certificado.tipo==1){
                
                return true;
                console.log(certificado);
            }
            else{
                return false;
            }
            
        }));
        
    });

    const onSubmitFormAntecedente = handleSubmitFormAntecedente(async (data) => {
        const personasFiltradas = personas.filter(persona => {
            return Object.entries(data).every(([key, value]) => {
                return value !== undefined &&value === persona[key];
            });
        });
        console.log(personasFiltradas);
    
        const elementosMostrados = await Promise.all(antecedentes.map(async (antecedente) => {
            const certificado=await getCertificado(antecedente.certificado);
            const historial = await getHistorialCertificado(certificado.historial);
            const persona = await getPersona(historial.duenno);
            return personasFiltradas.find(personaFiltrada => personaFiltrada.numeroDocumento === persona.numeroDocumento);
        }));
    
        setElementosMostrados(elementosMostrados.filter(Boolean)); // Filter out any undefined elements
    });


    
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

                    <button type="submit" onClick={selectedOption=="antecedentes"?onSubmitFormAntecedente:onSubmitFormDatosPersonales}>Buscar</button>
                </aside>

                <div className={styles.content}>
                    <header className={styles.header}>
                        <img src={Logo}></img>
                    </header>
                    
                    <div className={styles.items}>
                        {elementosMostrados&&elementosMostrados.map(elementoMostrado=>(
                            selectedOption=="antecedentes"?<Antecedente key={elementoMostrado.id} antecedente={elementoMostrado}></Antecedente>
                            :<Certificado key={elementoMostrado.id} elementoMostrado={elementoMostrado}></Certificado>
                        
                        ))}
                        
                        
                        <Link to="/login"><p className={styles.loginButtom}>Login</p></Link> 
                    </div>
                          
                </div>

            </div>
            
        </>
    )
}