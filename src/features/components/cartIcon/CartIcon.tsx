import { FC, useState, useEffect } from "react";
import styles from './CartIcon.module.css';
import { TCard } from "../../Types";
import { rootReducer } from "../../../app/store";
import { useAppSelector } from "../../../app/hooks/hooks";
import { Link } from "react-router-dom";



const CartIcon = () => {
    
    type IRootState = ReturnType<typeof rootReducer>
    const shoppingItems: TCard[] = useAppSelector((state: IRootState) => state.shoppingList.items);

    const scrollFloat = function() {
        const floatElement: any = document.getElementById('cart');

        if(floatElement){
                window.onscroll = function() {
                    if (window.scrollY > floatElement.offsetTop) {
                        if (floatElement.style.position !== 'fixed') {
                            floatElement.style.position = 'fixed';
                            floatElement.style.top = '2rem';
                            floatElement.style.right = '1rem';
                            floatElement.style.zIndex = 99;
                        
                        }
                    } else {
                        if (floatElement.style.position === 'fixed') {
                            floatElement.style.position = '';
                            floatElement.style.top = '';
                            floatElement.style.right = '';
                            floatElement.style.zIndex = '';
                        }
                    }
                };
        };

    };

    document.addEventListener('scroll', () => scrollFloat());


    const totalItems = (): number => 
                    shoppingItems.reduce(function (prev, item) {
                        if (item.quantity) {
                            return prev + item.quantity;
                        } else
                            return 0;         
                    }, 0)
    
    

    return (
        <Link  to="/cart" className={styles.cart} id="cart">
            <div className={styles.cartInner}>
                { shoppingItems && shoppingItems.length > 0 ? 
                    <div className={styles.cartCircle}>
                        <span className={styles.cartCount}>{totalItems()}</span>   
                    </div> 
                 : null}           
            </div>
        </Link>
    )
}

export default CartIcon;