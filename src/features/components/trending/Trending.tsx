import { FC, useEffect, useState } from "react";
import Header from "../header/header";
import CardList from "../CardList/CardList";
import CheckUsOnInst from "../CheckUsOnInst/CheckUsOnInst";
import Footer from "../Footer/Footer";
import { instPics } from "../../API";
import { TCard } from "../../Types";
import Spinner from "../spinner/spinner";
import { rootReducer } from "../../../app/store";
import { useAppSelector } from '../../../app/hooks/hooks'
import styles from './trending.module.css';


const Trending: FC = () => {

    const [trendingClothes, setTrending] = useState<TCard[]>([]);
    const [instPictures, setInstPics] = useState<any>([]);
    const [loadingInst, setLoadingInst] = useState<Boolean>();

    type IRootState = ReturnType<typeof rootReducer>
    const trending: TCard[] = useAppSelector((state: IRootState) => state.clotheslist.trending);

    useEffect( () => {
        setTrending(trending);
        instPics(setLoadingInst).then((pics) => setInstPics(pics));
    }, []);

    
    return (
        <>
            <Header/>
            <h2 className={styles.title}> Trending</h2>
            {
                trendingClothes ? <CardList clothes={trendingClothes}/> : <Spinner/> 
            }
            <div className={styles.quote}>
                <div className={styles.text}>“Beautiful collection of indie American brands at a fair price” </div>
                <div className={styles.socials}>
                    <a href="https://www.google.com/"><img alt='instagram' src={require('../../images/instagram.png')}/></a>
                    <a href="https://www.google.com/"><img alt='twitter' src={require('../../images/twitter.png')}/></a>
                    <a href="https://www.google.com/"><img  alt='facebook' src={require('../../images/facebook.png')}/></a>
                </div>
            </div>
            {
                loadingInst ? <Spinner/> :  <CheckUsOnInst pics={instPictures}/>
            }

            <Footer/>
        </>
    )
}


export default Trending;