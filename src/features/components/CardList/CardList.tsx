import React, { FC } from "react";
import { useState, useEffect } from "react";
import { TCard } from "../../Types";
import Spinner from "../spinner/spinner";
import styles from './cardlist.module.css';
import { useAppDispatch,useAppSelector } from "../../../app/hooks/hooks";
import { rootReducer } from "../../../app/store";
import { getShoppingItems } from "../../../app/reducers/getItems";



const CardList: FC<any> = ({clothes}): React.ReactElement=> {

    const [trendingClothes, setTrending] = useState<TCard[]>([]);
    const dispatch = useAppDispatch();

    type IRootState = ReturnType<typeof rootReducer>
    const shoppingItems: TCard[] = useAppSelector((state: IRootState) => state.shoppingList.items);

    useEffect( () => {
        setTrending(clothes);     
    }, [trendingClothes]);

    const addItem = (item: TCard):void => {

 
        const it = shoppingItems.find(ite => ite.id=== item.id);

        if(!it){
            let newIt = {...item};
            newIt.quantity = 1;
            dispatch(getShoppingItems([...shoppingItems, newIt])); 
        } else {
            let index = shoppingItems.findIndex(i => i === it);
            
            let newShoppingItems = [...shoppingItems];
            newShoppingItems.splice(index,1)
            let newIt = {...it};
                if(newIt.quantity){
                    newIt.quantity++;
                    dispatch(getShoppingItems([...newShoppingItems, newIt]));
                }
        }
    }

    const showTrend = (item: TCard): React.ReactElement => {
        return (
            <div key={item.id} className={styles.content}>
                <div className={styles.upperpartcard}> <div>TRENDING</div> <p>Sale: <span> 2k +</span></p></div>
                    <div> 
                        <img alt={item.title} src={item.image} className={styles.imagecard} ></img>
                        <div>
                            <p className={styles.leadingline}>New item for a new decade only for {item.price} $</p>
                            <div className={styles.description}>{item.title.slice(0, 50)}. {item.description.slice(0, 110)+ '...'}</div>
                        </div>         
                    </div>
                <button className={styles.buttonAdd} onClick={() => addItem(item)} >Add to cart</button>      
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

