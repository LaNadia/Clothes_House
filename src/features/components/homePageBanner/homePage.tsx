import { FC } from "react";
import styles from './homePage.module.css';


const HomePage: FC = () => {

    return (
        <div className={styles.container}>
            <div>          
                <h1 className={styles.title}> Woman Spring Range of Clothes</h1>
                <p className={styles.text}> Our new range of overcoats made from 100% cashmere, 
                    ethically sourced and without the price tag of old fashion houses.
                </p>
            </div>
                <div><img  className={styles.image} alt="banner" src={require('../../images/homePageBannerPic.png')}></img></div>
        </div>
    )
};

export default HomePage;