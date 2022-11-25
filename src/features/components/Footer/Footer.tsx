import React, { FC, useRef, useState } from "react";
import styles from './footer.module.css';

const Footer: FC = () => {

    const forma = useRef<HTMLFormElement>(null);
    const input = useRef<HTMLInputElement>(null);

    const [success, setSuccess] = useState<Boolean>(false);
    const [error, setError] = useState<Boolean>(false);

    const onSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        if(input.current) {
            if(input.current.value) {
                try{
                    let submitForm = forma.current;
                    let formData = new FormData(submitForm? submitForm : undefined);
                    
                    await fetch('https://httpbin.org/post', {  
                        method: 'POST',
                        body: formData,
                    }).then (response => {
                        if (response.ok && input.current) {
                            setSuccess(true);
                            input.current.value = '';
                    };});

                } catch(error) {
                    setError(true)
                };
            } else {
                alert('Please type your e-mail')
            };
        };
    };

    return (
        <>
        <div className={styles.footer}>
            <form id="email" className={styles.form} ref={forma}>
                <div className={styles.formInner}> 
                    <p className={styles.formFirstLine}>We also make emails </p> 
                    <p  className={styles.formSecondLine}>Recieve updates and offers you’ll actually be interested in. <br></br>
                        Unsubscribe any time. 
                    </p>
                </div>
                <div>
                    <input ref={input} className={styles.formInput} id='emailSubsc' type='email' placeholder="Email" required />
                    <button type="submit" className={styles.subscribeButton} onClick={(e) => onSubmit(e)}></button>
                </div>
            </form>
            <div className={styles.picture}>
               <div><img alt='banner' src={require('../../images/homePageBannerPic.png')}/> </div> 
                <h3>Clothes House</h3>
            </div>
            <div className={styles.categories}>
                    <ul>
                        <h3> SITE </h3>
                        <li> <a href='#'>Trending</a></li>
                        <li> <a href='#'>Journal</a></li>
                        <li> <a href='#'>About Us</a></li>
                    </ul>
                    <ul>
                        <h3> SUPPORT </h3>
                        <li> <a href='#'>Shipping and Delivery</a></li>
                        <li> <a href='#'>Returns Policy</a></li>
                        <li> <a href='#'>Privacy Policy</a></li>
                    </ul>
            </div>       
            <div className={styles.address}>
                <div>
                    <h3>Main City Store</h3>
                    <p>
                        Y Block 1101 Blue Area
                        New York, USA     
                    </p>
                </div>
                    <div>
                    <h3>New Opened Store</h3>
                    <p>
                       A Block 122 Green Area
                       Malibu, USA     
                    </p>
                 </div>   
            </div>
            <div>
                <div className={styles.rights}>© 2022 Clothes House. All rights reserved.</div>
            </div>
        </div>

         {success ?
                <div className={styles.modal}>
                    <div className={styles.modalInner}>
                        <p>
                            Subscribtion completed successfully! 
                            We’ll send you our best articles soon. 
                        </p>
                        <button className={styles.modalButton} onClick={()=> setSuccess(false)}>OK</button>
                    </div>
                </div>
        :  null}

        { error ? 
                <div className={styles.modal}>
                            <div className={styles.modalInner}>
                                <p>
                                    Sorry, a mistake occured. Please try again. 
                                </p>
                                <button className={styles.modalButton} onClick={(e)=> setError(false)}>OK</button>
                            </div>
                        </div> 
        : null}
        </>
    )
};

export default Footer;