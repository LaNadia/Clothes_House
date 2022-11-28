import { FC, SetStateAction, useEffect, useState } from "react";
import { Auth, getAuth, updateProfile } from "firebase/auth";
import Spinner from "features/components/spinner/spinner";
import { uploadAvatar } from "farebaseConfig";
import { useAuth } from "farebaseConfig";
import styles from './myprofile.module.css';
import Header from "features/components/header/header";
import Footer from "features/components/Footer/Footer";

const MyProfile: FC = () => {
    const currentUser = useAuth();

    const [photo, setPhoto] = useState<any>(); //usersphoto
    const [loading, setLoading] = useState<boolean>(false);
    const [photoUrl, setPhotoUrl] = useState<string>("https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [updated, setUpdated] = useState<boolean>(false);

  const update = async () => {

        await updateProfile(currentUser, {
                displayName: name
            }).then(() => {
            // Profile updated!
             // eslint-disable-next-line no-restricted-globals
             event?.preventDefault()
             setUpdated(true);
             console.log(updated);
            }).catch((error) => {
            // An error occurred
                // eslint-disable-next-line no-restricted-globals
                event?.preventDefault()
                console.log(error)
                alert('Please try again')              
            });
    }

    const changeName = (event: { currentTarget: { value: SetStateAction<string | undefined>; }; }) => {
        setName(event?.currentTarget?.value);
    }


    useEffect(() => {
        if(currentUser?.photoURL) {
           setPhotoUrl(currentUser.photoURL)
        }

        if(currentUser?.displayName){
            setName(currentUser.displayName);
        }
 
        if(currentUser?.email){
            setEmail(currentUser.email);
        }

    }, [currentUser]);

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        if(e.target.files[0]) {
            setPhoto (e.target.files[0]);  
        }
    }

    const handleClick = () => {
        uploadAvatar(photo, currentUser, setLoading, setPhotoUrl);
        setPhoto (null);  
    }

    const closeModal = () => {
        setUpdated(false)
    }


    return (
        <>
            <Header/>
            
            <div className={styles.profile_wrapper}>
                    <h5 className={styles.leading}>My profile</h5>
                    <div className={styles.profile}>
                        <div className={styles.profile_main}>
                            <input className={styles.input} type='file' id="input__file" onChange={(e) => handleChange(e)}/>
                                <label htmlFor="input__file" >
                                    <span className={styles.input_button}>Choose new photo</span>
                                </label>
                            { photo? 
                                <button className={styles.upload_button} disabled={loading} onClick={handleClick}>Upload 1 photo</button>  
                               : null 
                            }           
                            <img className={styles.profile_photo} alt="Avatar" src={photoUrl}/>
                        </div>
                        <form className={styles.info} onSubmit={update}>
                            <div>
                                <div className={styles.info_name}>Your name:</div>
                                    {   name !== undefined ? 
                                        <div>{name}</div>
                                        :
                                        // eslint-disable-next-line no-restricted-globals
                                        <input name="name" type="text" placeholder="Put your name here..." required onBlur={changeName} />
                                    }
                                </div>

                                <div>
                                    <div className={styles.info_name}>Your email:</div>
                                        <div>{email}</div> 
                                </div>

                          { name !== undefined ?  <button className={styles.change_button} onClick={() => setName(undefined)}>Change name</button> : <input type="submit" value="Update my name"/>}

                        </form>

                         { updated ? 
                            <div className={styles.updated} >
                                Your profile was successfully updated!
                                <button onClick={() => closeModal()} className={styles.upload_button}>OK</button>
                            </div>
                            : null  } 
                    </div>
            </div>  

            <Footer/>
    </>
    )}

export default MyProfile;