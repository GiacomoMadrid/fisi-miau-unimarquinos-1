import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

import styles from "./LoginPage.module.css";
import Logo from "./images/logo.png";

export function LoginPage() {


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

                        <form >
                            <h1>Login</h1>

                            <input type="text" 
                            placeholder="Username">
                            </input> 

                            <input type="password" 
                            placeholder="Password">
                            </input> 

                            <Link to="/antecedentes-registrados"><button type="submit" className={styles.loginButtom}>Login</button></Link>
                        </form>

                    </div>
                </section>
            </section>
            <Link to="/"><p className={styles.volver}>Volver</p></Link>
            
      </>
    )
}