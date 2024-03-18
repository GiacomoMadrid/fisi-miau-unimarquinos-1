import {Helmet} from "react-helmet";

import styles from "./ActualizarCertificadosPage.module.css";

import { crearAntecedente, crearCertificado, getAllAntecedentes, getAllCertificados, getAllHistorialCertificados, getAntecedente, getCertificado, getPersona, getUsuario } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";


export async function loader(){
  const antecedentes = (await getAllAntecedentes()).data;
  const certificados = (await getAllCertificados()).data;
  const historialCertificados=(await getAllHistorialCertificados()).data;

  return({antecedentes,certificados,historialCertificados});
}


export function ActualizarCertificadosPage() {

  const { register: registerFormPersona, handleSubmit: handleSubmitFormPersona } = useForm();
  const{register:registerFormActualizar,handleSubmit:handleSubmitFormActualizar}=useForm();

  const idUsuario=(useParams()).userID;
  const dataApi=useLoaderData();
  const [inputCertificado,setInputCertificado]=useState("");
  const [tipoCertificado,setTipoCertificado]=useState("");
  const [antecedentesHistorial,setAntecedentesHistorial]=useState([]);
  const [antecedenteSeleccionado,setAntecedenteSeleccionado]=useState({});


  useEffect(()=>{
    async function inicializarTipoCertificado(){
      const cargo=((await getUsuario(idUsuario)).data).cargo;

      if(cargo=="Juez"||cargo=="Jueza"){
        setTipoCertificado(1);
      }
      else if(cargo=="Secretario del Poder Judicial"||cargo=="Secretaria del Poder Judicial"){
        setTipoCertificado(2);
      }
      else{
        setTipoCertificado(3);
      }
    };
    
    inicializarTipoCertificado();
  },[]);


  const onSubmitFormPersona=handleSubmitFormPersona(async(formData)=>{
    const persona=(await getPersona(formData.numeroDocumento)).data;
    const historialCertificado=dataApi.historialCertificados.find((historialCertificado=>historialCertificado.duenno==persona.numeroDocumento&&historialCertificado.tipo==tipoCertificado));
    const certificadosHistorial=dataApi.certificados.filter((certificado)=>certificado.historial==historialCertificado.id);
    const certificadoActual=certificadosHistorial.reduce((prev,curr)=>{
      if(!prev||curr.version>prev.version){
        return curr;
      }
      else{
        return prev;
      }
    },null);

    setInputCertificado(certificadoActual.id);

    const antecedentesFiltrados=[];
    for (const antecedente of dataApi.antecedentes){
      const certificado=(await getCertificado(antecedente.certificado)).data;
      if(certificado.historial==historialCertificado.id){
        antecedentesFiltrados.push(antecedente);
      }
    }

    setAntecedentesHistorial(antecedentesFiltrados);
    setAntecedenteSeleccionado(antecedentesFiltrados[0]);
    console.log(antecedentesFiltrados[0]);
  });

  async function handleAntecedenteChange(e){
    const antecedente=(await getAntecedente(e.target.value)).data;

    setAntecedenteSeleccionado(antecedente);
    console.log(antecedente);
  }

  const onSubmitFormActualizar=handleSubmitFormActualizar(async(dataForm)=>{
    console.log(dataForm);
    const currentDateTime = new Date().toISOString();
    const antecedenteAntiguo=(await getAntecedente(dataForm.antecedente)).data;

    const certificadoActual=(await getCertificado(inputCertificado)).data;

    

    const antecedenteActualizado={
      "nombre":`Actualizacion(${antecedenteSeleccionado.id}): ${dataForm.nombre}`,
      "descripcion":dataForm.descripcion,
      "fechaRegistro":currentDateTime,
      "tipo":tipoCertificado,
      "certificado":certificadoActual.id,
      "departamento" :antecedenteAntiguo.departamento, 
      "provincia":antecedenteAntiguo.provincia,
      "distrito":antecedenteAntiguo.distrito,
      "usuarioRegistrador":parseInt(idUsuario),
    };

    console.log(antecedenteActualizado);
    await crearAntecedente(antecedenteActualizado);
  });



    return (
      <>
        <Helmet>
                <title>Actualizar certificados</title>
        </Helmet>

        <div className={styles.actualizarCertificadoContainer}>
          <div className={styles.contenedorPersona}>
            <div className={styles.persona}>
              <p>Persona</p>
              <input type="text" placeholder="DNI/Carnet extranjería" {...registerFormPersona("numeroDocumento",{required:true})}></input>
              <div>
                    <input className={styles.certificado}type="text" placeholder={inputCertificado==""?"Certificado":inputCertificado} value={inputCertificado} disabled></input>
                    <div>
                      <button className={styles.buscarButtom} onClick={onSubmitFormPersona}>Buscar</button>
                    </div>
                    
              </div>
            </div>
          </div>
          
          <div className={styles.contenedorCertificado}>
            <div className={styles.certificado}>
              <p>Certificado</p>
              <input type="text" placeholder="Tipo" disabled value={tipoCertificado}></input>
              <select  {...registerFormActualizar("antecedente")} onChange={(e)=>handleAntecedenteChange(e)}>
                {antecedentesHistorial.map(antecedenteHistorial=>
                  <option  key={antecedenteHistorial.id} value={antecedenteHistorial.id}> {"("}{antecedenteHistorial.id}{")"} {antecedenteHistorial.nombre}</option>)}
              </select>
              <input type="text" placeholder="Factor de actualización de antecedente"  {...registerFormActualizar("nombre",{required:true})}></input>
              <textarea type="text" placeholder="Descripción" {...registerFormActualizar("descripcion",{required:true})}></textarea>
              <div className={styles.buttons} ><button onClick={onSubmitFormActualizar}>Actualizar</button></div>
            </div>
          </div>
          
        </div>
        
      </>
    )
}