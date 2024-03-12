import {Helmet} from "react-helmet";
import {Link,useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import styles from "./LoginPage.module.css";
import Logo from "./images/logo.png";

import { getAllUsuarios } from "../../api/api";





export async function loader(){
    const usuarios= (await getAllUsuarios()).data;
    
    console.log(usuarios);
    return{usuarios};
}



export function LoginPage() {

    const navigate=useNavigate();
    const dataApi=useLoaderData();
    const {register,handleSubmit}=useForm();



    const onLoginButtom=handleSubmit(dataForm=>{
        const foundUser=dataApi.usuarios.find(user=>user.username==dataForm.username&&user.password==dataForm.password);

        if(foundUser){
            navigate(`/${foundUser.id}/antecedentes-registrados`);      
        }
        else{
            alert("Usuario no válido");
        }
    });



    return (
      <>
        <Helmet>
                <title>Login</title>
        </Helmet>
        
        <section className={styles.contentContainer}>
                <section className={styles.content}>

                    <div className={styles.imgContainer}>
                        <img src={Logo}/>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.backgroundDecoration}>
                            
                        </div>

                        <form onSubmit={onLoginButtom}>
                            <h1>Login</h1>

                            <input type="text" 
                            placeholder="Username"
                            {...register("username",{required:true})}>
                            </input> 

                            <input type="password" 
                            placeholder="Password"
                            {...register("password",{required:true})}>
                            </input> 

                            <button type="submit" className={styles.loginButtom}>Login</button>
                        </form>

                    </div>
                </section>
            </section>
            <Link to="/"><p className={styles.volver}>Volver</p></Link>
            
      </>
    )
}