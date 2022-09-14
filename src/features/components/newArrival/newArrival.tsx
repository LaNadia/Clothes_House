import { FC, useState, useEffect } from "react";
import CardList from "../CardList/CardList";
import Header from "../header/header";
import Footer from "../Footer/Footer";
import CheckUsOnInst from "../CheckUsOnInst/CheckUsOnInst";
import { TCard } from "../../Types";
import { rootReducer } from "../../../app/store";
import { useSelector } from "react-redux";
import { instPics } from "../../API";
import Spinner from "../spinner/spinner";
import styles from './newarrival.module.css'


const NewArrival: FC = () => {

    const [arrivalClothes, setArrivalClothes] = useState<TCard[]>([]);
    const [arrivalToShow, setArrivalToShow] = useState<TCard[]>([]);
    const [instPictures, setInstPics] = useState<Response[] | undefined>([]);
    const [loadingArrival, setLoadingArrival] = useState<Boolean>();
    const [loadingInst, setLoadingInst] = useState<Boolean>();

    type IRootState = ReturnType<typeof rootReducer>
    const arrival: TCard[] = useSelector((state: IRootState) => state.clotheslist.arrival);
    
    useEffect( () => {
        setArrivalClothes(arrival);
        instPics(setLoadingInst).then((pics) => setInstPics(pics));

        setLoadingArrival(true);
        setArrivalToShow(arrival.slice(0,6));
        setLoadingArrival(false);

    }, []);

    const loadMoreArrival = async () => {
  
        setLoadingArrival(true);

        let shownArrival = [...arrivalToShow];
        let newArrival = arrivalClothes.slice(arrivalToShow.length, arrivalToShow.length + 5);
        for(let i=0; i< newArrival.length; i++){
            shownArrival.push(newArrival[i])
        }
        setArrivalToShow(shownArrival);

        setLoadingArrival(false);
    };

    return (
        <>
        <Header/>
        <h2 className={styles.title}>New Arrival</h2>
        <div>
            {
            loadingArrival ? <Spinner/> : <CardList key={arrivalToShow} clothes={arrivalToShow}/>
            }
        </div>
        {
            arrivalToShow < arrivalClothes ? <div className={styles.buttonparent} ><button className={styles.button} onClick={() => loadMoreArrival()}> Load More</button></div> 
            : null
        }
        {
          loadingInst ? <Spinner/> : instPictures ? <CheckUsOnInst pics={instPictures} /> : null
        }
        <Footer/>
        </>
    )
    }

    export default NewArrival;