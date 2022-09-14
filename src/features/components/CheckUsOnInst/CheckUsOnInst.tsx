import { FC, useState, useEffect } from "react";
import { TStateUseList, TStateUse } from "../../Types";
import styles from './checkusoninst.module.css'


const CheckUsOnInst: FC<TStateUseList>= ({pics}) => {

    const [instPics, setInstPics] = useState<TStateUse[]>([]);

    useEffect( () => {
        if(pics){
            setInstPics(pics);
        }
    })

    const showTrend = (item: TStateUse) => {
        return (
            <div key={item.url} >
               <img src={item.url} />
            </div>
        )  
    }

    const content = instPics ? instPics.map((item: TStateUse)=> showTrend(item)) : null;

    return (
        <div className={styles.content}>
            <div className={styles.followcontent}>
                <p className={styles.title}>Check us on Instagram</p>
                <a className={styles.follow} href="https://www.google.com/"> follow us on the gram</a>
            </div>
            <div className={styles.pictures}>
              {content}
            </div>
        </div>
    )
};

export default CheckUsOnInst;