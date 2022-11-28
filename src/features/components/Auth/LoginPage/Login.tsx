import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import { useAppDispatch } from "app/hooks/hooks";
import {setUser} from '../../../../app/reducers/user';
import { getAuth, signInWithEmailAndPassword, OAuthCredential } from "firebase/auth";
import Header from "features/components/header/header";
import Footer from "features/components/Footer/Footer";
import styles from './login.module.css';
import Spinner from "features/components/spinner/spinner";


const Login: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isWrong, setIsWrong] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showWrongLogin = () => {
        setIsWrong(true);
        setIsLoading(false);
    }


   
    const handleLogin = async (email: string, password: string) => {    
        const auth = getAuth();

        setIsLoading(true);
        setIsWrong(false);
    

        await signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    token: (user as unknown as OAuthCredential).accessToken,
                    id: user.uid,
                }));

                setIsLoading(false);
                navigate('/');
                
            })
            .catch(() => showWrongLogin());   
    };
   
    return (
        <>
            <Header/>
           
            <div className={styles.container}>
                <h1 className={styles.loginTitle}>Login</h1>
                {isWrong ? <div className={styles.wrong}>Wrong login or password, please try again</div> : null}
                { isLoading ? <Spinner/> :
                <>
                    <Form
                            title='Sign in'
                            handleClick={(email: string, password: string) => handleLogin(email, password)}
                    />
                    <div className={styles.toReg}> 
                        New to us? 
                        <div className={styles.toRegLink}>
                            <Link to="/register">Register</Link>
                        </div>
                        </div>
                </> }
     
            </div>

            <Footer/>
        </>


    )
}

export default Login;

