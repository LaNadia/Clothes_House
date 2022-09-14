import { FC } from "react";
import styles from './footer.module.css';

const Footer: FC = () => {

    return (
        <>
        <div className={styles.footer}>
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
        </>
    )
};

export default Footer;