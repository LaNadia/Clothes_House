import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import { useAppDispatch } from "app/hooks/hooks";
import {setUser} from '../../../../app/reducers/user';
import { getAuth, createUserWithEmailAndPassword, OAuthCredential } from "firebase/auth";
import Spinner from "features/components/spinner/spinner";

const SignUp: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isWrong, setIsWrong] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showError = () => {
        setIsWrong(true);
        setIsLoading(false);
    }
    
    const handleRegister = async (email: string, password: string) => {
        
        setIsLoading(true);
        setIsWrong(false);

        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    token: (user as unknown as OAuthCredential).accessToken,
                    id: user.uid,
                }));
                setIsLoading(false);
                navigate('/');

            })
            .catch(() => showError())


    };
   
    return (
        <>
            {isWrong ? <div style={{fontSize: '1.5rem', color: 'red' }}>This e-mail is already used.</div> : null}
            { isLoading ? <Spinner/> :
                <Form
                     title='register'
                     handleClick={handleRegister}
                />
            }
        </>
        
    )
}

export default SignUp;

