import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

import styles from "./LoginPage.module.css";

export function LoginPage() {


    return (
      <>
        <Helmet>
                <title>Login</title>
        </Helmet>
        
        <section className={styles.contentContainer}>
                <section className={styles.content}>

                    <div className={styles.imgContainer}>
                        <img />
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.backgroundDecoration}>
                            
                        </div>

                        <form >
                            <h1>User login</h1>

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
      </>
    )
}