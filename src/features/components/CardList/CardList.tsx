import React, { FC } from "react";
import { useState, useEffect } from "react";
import { TCard } from "../../Types";
import Spinner from "../spinner/spinner";
import styles from './cardlist.module.css'


const CardList: FC<any> = ({clothes}) => {

    const [trendingClothes, setTrending] = useState<TCard[]>([]);

    useEffect( () => {
        setTrending(clothes);     
    }, [trendingClothes])

    const showTrend = (item: TCard) => {
        return (
            <div key={item.id} className={styles.content}>
                <div className={styles.upperpartcard}> <div>TRENDING</div> <p>Sale: <span> 2k +</span></p></div>
                <div > 
                    <img alt={item.title} src={item.image} className={styles.imagecard} ></img>
                    <div>
                        <p className={styles.leadingline}>New item for a new decade only for {item.price} $</p>
                        <div className={styles.description}>{item.title}. {item.description}</div>
                    </div>                
                </div> 
            </div>
        ) 
    };

    const content = trendingClothes ? trendingClothes.map((item: TCard)=> showTrend(item)) : <Spinner/>;

    return (
        <div className={styles.container}>
            {content}   
        </div>
    )
};

export default CardList;

