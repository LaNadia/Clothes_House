import { FC, useState } from "react";
import { TForm } from "features/Types";
import styles from './form.module.css'


 const Form: FC<TForm> = ({title, handleClick}): JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
            <div className={styles.container}>
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    { title === 'register' ?
                        <p className={styles.note}>
                            Please note your password should be 6 characters minimun
                        </p>
                    : null}

                    <button
                        onClick={()=> handleClick(email, password)}
                    >
                        {title}
                    </button>
            </div>
    )
    
}

export default Form;