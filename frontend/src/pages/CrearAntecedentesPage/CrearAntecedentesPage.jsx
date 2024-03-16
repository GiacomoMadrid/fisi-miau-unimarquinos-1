import {Helmet} from "react-helmet";
import { useForm } from "react-hook-form";

import styles from "./CrearAntecedentesPage.module.css";

import { crearAntecedente, crearDepartamento, crearDistrito, crearProvincia, getAllAntecedentes, getAllCertificados, getAllDepartamentos, getAllDistritos, getAllHistorialCertificados, getAllProvincias, getPersona, getUsuario } from "../../api/api";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";


export async function loader(){
  const antecedentes = (await getAllAntecedentes()).data;
  const certificados = (await getAllCertificados()).data;
  const historialCertificados=(await getAllHistorialCertificados()).data;
  const departamentos=(await getAllDepartamentos()).data;
  const provincias=(await getAllProvincias()).data;
  const distritos=(await getAllDistritos()).data;

  return({antecedentes,certificados,historialCertificados,departamentos,provincias,distritos});
}

export function CrearAntecedentesPage() {

    const { register: registerFormPersona, handleSubmit: handleSubmitFormPersona } = useForm();
    const { register: registerFormAntecedente, handleSubmit: handleSubmitFormAntecedente } = useForm();

    const idUsuario=(useParams()).userID;
    const dataApi=useLoaderData();
    const [inputCertificado,setInputCertificado]=useState("");
    const [tipoCertificado,setTipoCertificado]=useState();

    useEffect(()=>{
      async function inicializarTipoCertificado(){
        const cargo=((await getUsuario(idUsuario)).data).cargo;

        if(cargo=="Juez"||cargo=="Jueza"){
          setTipoCertificado(1);
        }
        else if(cargo=="Secretario del poder judicial"||cargo=="Secretaria del poder judicial"){
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
    });


    const onSubmitFormAntecedente=handleSubmitFormAntecedente(async(dataForm)=>{
      const currentDateTime = new Date().toISOString();

      let departamento =dataApi.departamentos.find(departamento=>departamento.nombre==dataForm.departamento)
      console.log(departamento);
      if(departamento==null){
        departamento=(await crearDepartamento({"nombre":dataForm.departamento,"pais":1})).data; 
      }
      console.log(departamento);
      let provincia =dataApi.provincias.find(provincia=>provincia.nombre==dataForm.provincia&&provincia.departamento==departamento.id);
      if(provincia==null){
        provincia=(await crearProvincia({"nombre":dataForm.provincia,"departamento":departamento.id})).data;
      }
      let distrito =dataApi.distritos.find(distrito=>distrito.nombre==dataForm.distrito&&distrito.provincia==provincia.id);
      if(distrito==null){
        distrito=(await crearDistrito({"nombre":dataForm.distrito,"provincia":provincia.id})).data;
      }

      const nuevoAntecedente={
        "nombre":dataForm.titulo,
        "descripcion":dataForm.descripcion,
        "fechaRegistro":currentDateTime,
        "tipo":tipoCertificado,
        "certificado":inputCertificado,
        "departamento" :departamento.id, 
        "provincia":provincia.id,
        "distrito":distrito.id,
        "usuarioRegistrador":idUsuario
      };

      await crearAntecedente(nuevoAntecedente);
    });




    return (
      <>
        <Helmet>
                <title>Crear antecedentes</title>
        </Helmet>

        <div className={styles.crearAntecedentesContainer}>
          <div className={styles.contenedorPersona}>
            <div className={styles.persona}>
              <p>Persona</p>
              <input type="text" placeholder="DNI/Carnet extranjería"  {...registerFormPersona("numeroDocumento",{required:true})}></input>
              <div>
                    <input type="text" placeholder={inputCertificado==""?"Certificado":undefined} value={inputCertificado} disabled></input>
                    <div>
                      <button className={styles.buscarButtom} onClick={onSubmitFormPersona}>Buscar</button>
                    </div>
                    
              </div>
            </div>
          </div>
          

          <div className={styles.contenedorAntecedente}>
            <div className={styles.antecedente}>
              <p>Antecedente</p>
              <input type="text" placeholder="Tipo" disabled value={tipoCertificado}></input>
              <input type="text" placeholder="Título" {...registerFormAntecedente("titulo",{required:true})}></input>
              <input type="text" placeholder="Departamento" {...registerFormAntecedente("departamento",{required:true})}></input>
              <input type="text" placeholder="Provincia" {...registerFormAntecedente("provincia",{required:true})}></input>
              <input type="text" placeholder="Distrito" {...registerFormAntecedente("distrito",{required:true})}></input>
              <textarea type="text" placeholder="Descripción" {...registerFormAntecedente("descripcion",{required:true})}></textarea>
              <button className={styles.crearButtom} onClick={onSubmitFormAntecedente} >Crear</button>
            </div>
          </div>
          
        </div>
      </>
    )
}