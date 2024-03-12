import axios from "axios";


const usuarioApi=axios.create({
    baseURL:"http://127.0.0.1:8000/api/Usuario/",
});
const paisApi=axios.create({
    baseURL:"http://127.0.0.1:8000/api/Pais/",
});
const nacionalidadApi=axios.create({
    baseURL:"http://127.0.0.1:8000/api/Nacionalidad/",
});
const personaApi=axios.create({
    baseURL:"http://127.0.0.1:8000/api/Persona/",
});


export const getAllUsuarios=()=>usuarioApi.get("/");
export const getAllPaises=()=>paisApi.get("/");
export const getAllNacionalidades=()=>nacionalidadApi.get("/");
export const getAllPersonas=()=>personaApi.get("/");


export const getUsuario=(id)=>usuarioApi.get(`/${id}/`);
export const getPais=(id)=>paisApi.get(`/${id}/`);
export const getNacionalidad=(id)=>nacionalidadApi.get(`/${id}/`);
export const getPersona=(id)=>personaApi.get(`/${id}/`);


export const crearUsuario=(usuario)=>usuarioApi.post("/",usuario);
export const crearPais=(pais)=>paisApi.post("/",pais);
export const crearNacionalidad=(nacionalidad)=>nacionalidadApi.post("/",nacionalidad);
export const crearPersona=(persona)=>personaApi.post("/",persona);


export const deleteUsuario=(id)=>usuarioApi.delete(`/${id}/`);
export const deletePais=(id)=>paisApi.delete(`/${id}/`);
export const deleteNacionalidad=(id)=>nacionalidadApi.delete(`/${id}/`);
export const deletePersona=(id)=>personaApi.delete(`/${id}/`);


export const updateUsuario=(id,usuario)=>usuarioApi.put(`/${id}/`,usuario);
export const updatePais=(id,pais)=>paisApi.put(`/${id}/`,pais);
export const updateNacionalidad=(id,nacionalidad)=>nacionalidadApi.put(`/${id}/`,nacionalidad);
export const updatePersona=(id,persona)=>personaApi.put(`/${id}/`,persona);












const certificadoApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/Certificado/",
});
const antecedenteApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/Antecedente/",
});
const departamentoApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/Departamento/",
});
const provinciaApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/Provincia/",
});
const distritoApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/Distrito/",
});
const tipoAntecedenteApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/TipoAntecedente/",
});
const tipoCertificadoApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/TipoCertificado/",
});
const historialCertificadoApi=axios.create({
    baseURL:"http://127.0.0.1:8000/antecedentes/HistorialCertificado/",
});


export const getAllCertificados=()=>certificadoApi.get("/");
export const getAllAntecedentes=()=>antecedenteApi.get("/");
export const getAllDepartamentos=()=>departamentoApi.get("/");
export const getAllProvincias=()=>provinciaApi.get("/");
export const getAllDistritos=()=>distritoApi.get("/");
export const getAllTipoAntecedentes=()=>tipoAntecedenteApi.get("/");
export const getAllTipoCertificados=()=>tipoCertificadoApi.get("/");
export const getAllHistorialCertificados=()=>historialCertificadoApi.get("/");


export const getCertificado=(id)=>certificadoApi.get(`/${id}/`);
export const getAntecedente=(id)=>antecedenteApi.get(`/${id}/`);
export const getDepartamento=(id)=>departamentoApi.get(`/${id}/`);
export const getProvincia=(id)=>provinciaApi.get(`/${id}/`);
export const getDistrito=(id)=>distritoApi.get(`/${id}/`);
export const getTipoAntecedente=(id)=>tipoAntecedenteApi.get(`/${id}/`);
export const getTipoCertificado=(id)=>tipoCertificadoApi.get(`/${id}/`);
export const getHistorialCertificado=(id)=>historialCertificadoApi.get(`/${id}/`);


export const crearCertificado=(certificado)=>certificadoApi.post("/",certificado);
export const crearAntecedente=(antecedente)=>antecedenteApi.post("/",antecedente);
export const crearDepartamento=(departamento)=>departamentoApi.post("/",departamento);
export const crearProvincia=(provincia)=>provinciaApi.post("/",provincia);
export const crearDistrito=(distrito)=>distritoApi.post("/",distrito);
export const crearTipoAntecedente=(tipoAntecedente)=>tipoAntecedenteApi.post("/",tipoAntecedente);
export const crearTipoCertificado=(tipoCertificado)=>tipoCertificadoApi.post("/",tipoCertificado);
export const crearHistorialCertificado=(historialCertificado)=>historialCertificadoApi.post("/",historialCertificado);


export const deleteCertificado=(id)=>certificadoApi.delete(`/${id}/`);
export const deleteAntecedente=(id)=>antecedenteApi.delete(`/${id}/`);
export const deleteDepartamento=(id)=>departamentoApi.delete(`/${id}/`);
export const deleteProvincia=(id)=>provinciaApi.delete(`/${id}/`);
export const deleteDistrito=(id)=>distritoApi.delete(`/${id}/`);
export const deleteTipoAntecedente=(id)=>tipoAntecedenteApi.delete(`/${id}/`);
export const deleteTipoCertificado=(id)=>tipoCertificadoApi.delete(`/${id}/`);
export const deleteHistorialCertificado=(id)=>historialCertificadoApi.delete(`/${id}/`);


export const updateCertificado=(id,certificado)=>certificadoApi.put(`/${id}/`,certificado);
export const updateAntecedente=(id,antecedente)=>antecedenteApi.put(`/${id}/`,antecedente);
export const updateDepartamento=(id,departamento)=>departamentoApi.put(`/${id}/`,departamento);
export const updateProvincia=(id,provincia)=>provinciaApi.put(`/${id}/`,provincia);
export const updateDistrito=(id,distrito)=>distritoApi.put(`/${id}/`,distrito);
export const updateTipoAntecedente=(id,tipoAntecedente)=>tipoAntecedenteApi.put(`/${id}/`,tipoAntecedente);
export const updateTipoCertificado=(id,tipoCertificado)=>certificadoApi.put(`/${id}/`,tipoCertificado);
export const updateHistorialCertificado=(id,historialCertificado)=>historialCertificadoApi.put(`/${id}/`,historialCertificado);
