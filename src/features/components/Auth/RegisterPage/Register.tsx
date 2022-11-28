import Footer from "features/components/Footer/Footer";
import Header from "features/components/header/header";
import { FC } from "react";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import styles from './register.module.css'


const Register: FC = () => {
    return (
        <>
        <Header/>
        <div className={styles.container}>
                <h1 className={styles.regTitle}>Register</h1>
                <SignUp/>  
                <div className={styles.toLogin}>
                    Already have an account?
                    <div className={styles.toLoginLink}>
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        <Footer/>
        </>
    )
}

export default Register;

