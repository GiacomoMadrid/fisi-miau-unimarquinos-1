import {Helmet} from "react-helmet";
import {Link, useLoaderData} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";

import Logo from "./images/Logo.svg";
import styles from "./HomePage.module.css";

import {Certificado} from "../../components/Certificado/Certificado";
import {Antecedente} from "../../components/Antecedente/Antecedente";
import {getAllAntecedentes,getAllCertificados, getAllHistorialCertificados, getAllPersonas, getDepartamento, getDistrito, getProvincia, getTipoAntecedente} from "../../api/api.js";


export async function loader(){
    const certificados= (await getAllCertificados()).data;
    const antecedentes=(await getAllAntecedentes()).data;
    const personas=(await getAllPersonas()).data;
    const historialCertificados=(await getAllHistorialCertificados()).data;

    return({historialCertificados,certificados,antecedentes,personas});
}



export function HomePage(){

    const dataApi=useLoaderData();

    const [datosDisabled,setDatosDisabled]=useState([]);
    const [antecedentesDisabled,setAntecedentesDisabled]=useState([]);
    const [selectedOption, setSelectedOption] = useState("datosPersonales");

    const { register: registerFormDatosPersonales, handleSubmit: handleSubmitFormDatosPersonales } = useForm();
    const { register: registerFormAntecedente, handleSubmit: handleSubmitFormAntecedente } = useForm();

    const [certificadosMostrados,setCertificadosMostrados]=useState([]);
    const [antecedentesMostrados,setAntecedentesMostrados]=useState([]);
    


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

    },[selectedOption,certificadosMostrados]);



    const onBuscarDatosPersonales=handleSubmitFormDatosPersonales(dataForm =>{
        
        const dataFormFiltrado= Object.entries(dataForm).filter(([,value])=>value!=undefined);
        

        const personasFiltradas=dataApi.personas.filter((persona)=>{
            let totalCoincidence=true;

            for(const [key,value]of dataFormFiltrado){
                if(persona[key]!=value){
                    totalCoincidence=false;
                    break;
                }
            }
            return totalCoincidence;
        });



        const certificadosFiltrados=[];
        for (const persona of personasFiltradas){
            const historialesFiltrados=dataApi.historialCertificados.filter(historial=>historial.duenno==persona.numeroDocumento);

        
            for(const historialFiltrado of historialesFiltrados){
                dataApi.certificados.forEach(certificado=>{
                    if(certificado.historial==historialFiltrado.id){
                        certificadosFiltrados.push(certificado);  
                    }
                });             
            }
                
            
        }
        setCertificadosMostrados(certificadosFiltrados);
        
    });

    const onBuscarAntecedentes=handleSubmitFormAntecedente(async (dataForm)=>{
        const antecedentesFiltrados=[];

        const dataFormFiltrado= Object.entries(dataForm).filter(([,value])=>value!=undefined&&value!="");        
        

        for(const antecedente of dataApi.antecedentes){
            let totalCoincidence=true;

            const antecedenteObjeto={
                "departamento":((await getDepartamento(antecedente.departamento)).data).nombre,
                "provincia":((await getProvincia(antecedente.provincia)).data).nombre,
                "distrito":((await getDistrito(antecedente.distrito)).data).nombre,
                "fecha":antecedente.fechaRegistro,
                "tipoAntecedente":((await getTipoAntecedente(antecedente.tipo)).data).nombre
            }

            for(const[key,value] of dataFormFiltrado){
                if(key=="inicio-periodo"||key=="final-periodo"){
                    const fechaInicio = new Date(dataFormFiltrado["inicio-periodo"]);
                    const fechaFinal = new Date(dataFormFiltrado["final-periodo"]);
                    const antecedenteFecha = new Date(antecedente.fechaRegistro);
                    
                    if (antecedenteFecha < fechaInicio || antecedenteFecha > fechaFinal) {
                        totalCoincidence = false;
                        break;
                    }
                }
                else if(antecedenteObjeto[key]!=value){
                    totalCoincidence=false;
                    break;
                }
            }

            if(totalCoincidence){
                antecedentesFiltrados.push(antecedente);
            }
        }
        console.log(antecedentesFiltrados);
        setAntecedentesMostrados(antecedentesFiltrados);
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

                    <select type="text" 
                    {...registerFormAntecedente("tipoAntecedente")}
                    disabled={antecedentesDisabled}
                    >
                        <option value="">Tipo de antecedente</option>
                        <option value="Antecedente Penal">Antecedente Penal</option>
                        <option value="Antecedente Policial">Antecedente Policial</option>
                        <option value="Antecedente Judicial">Antecedente Judicial</option>

                    </select>

                    <button onClick={selectedOption=="datosPersonales"?onBuscarDatosPersonales:onBuscarAntecedentes} >Buscar</button>
                </aside>

                <div className={styles.content}>
                    <header className={styles.header}>
                        <img src={Logo}></img>
                    </header>
                    
                    <div className={styles.items}>
                        {selectedOption=="datosPersonales"? (
                            certificadosMostrados.length!=0?certificadosMostrados.map(certificado=><Certificado key={certificado.id} objetoCertificado={certificado}></Certificado>)
                            : <p>No hay resultados</p>   )
                        
                        :(antecedentesMostrados.length!=0?antecedentesMostrados.map(certificado=><Antecedente key={certificado.id} objetoAntecedente={certificado}></Antecedente>)
                            : <p>No hay resultados</p>   )
                        }
                        
                        
                        <Link to="/login"><p className={styles.loginButtom}>Login</p></Link> 
                    </div>
                          
                </div>

            </div>
            
        </>
    )
}