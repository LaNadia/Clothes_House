import { FC, useState,useEffect } from 'react';
import styles from '../Cart/cart.module.css';
import { TCard } from "../../Types";
import { rootReducer } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks";
import { useAuth } from "farebaseConfig";
import { useNavigate } from "react-router-dom";
import Header from '../header/header';
import Footer from '../Footer/Footer';
import { getShoppingItems } from 'app/reducers/getItems';



const Checkout: FC = (): React.ReactElement => {

    const [items, setItems] = useState<TCard[]>([]);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [orderOk, setOrderOk] = useState<boolean>(false);

    type IRootState = ReturnType<typeof rootReducer>
    const shoppingItems: TCard[] = useAppSelector((state: IRootState) => state.shoppingList.items);
    const currentUser = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect( () => {      
        setItems(shoppingItems);

        if(currentUser?.displayName){
            setName(currentUser.displayName);
        };
        if(currentUser?.email){
            setEmail(currentUser.email);
        }
    });

    let totalPrice = items.reduce(function (previousValue, item) {               
        if(item.quantity){
       return previousValue + (Number(item.price) * item.quantity)
        } else return 0;
      }, 0).toFixed(2);

    const showModal = () => {
        setOrderOk(true)
            // modalBody.innerHTML =`
            // <div class="modal__body-inner">
            // <p>
            //     Order successful! Your order is being cooked :) <br>
            //     We’ll notify you about delivery time shortly.<br>
                
            // </p>
            // </div>
            // `;           
    }

    const closeModal = () => {
        setOrderOk(false);
        navigate('/');
    }



    const handleSubmit = async (event: any)  => {
            event.preventDefault();  // предотвращение перезагрузки страницы 
           
            let formData = new FormData(event.target);  // формирование formData 
         //   formData.append('order', shoppingItems);

            let order = {user: formData, items: shoppingItems}
            await fetch('https://httpbin.org/post', {  // ждем fetch
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(order),           
                })
            .then (response => {
                if (response.ok) {
                    console.log(Object.fromEntries(formData))
                    dispatch(getShoppingItems([]));
                    showModal()
                }})
            .catch((error) => {
                throw new Error("Something gone wrong, please try again", error);
                  });
      };





    return (
        <>
              <Header/>
              <div className={styles.wrapperCheckout} >
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.mycart}>Checkout</div>                       
                            <div className={styles.listLittle}>
                                {items.map(function(item: TCard) {
                                    return (
                                        <div key={item.id} className={styles.itemLittle}>
                                            <div>
                                                <div>
                                                    <img src={item.image} alt={item.title}/>
                                                </div>
                                            </div>
                                            <div className={styles.itemInfoLittle}>
                                                    <p>{Number(item.price) * (item.quantity ? item.quantity : 1)} $</p>
                                                    <p>{item.title.slice(0, 60)+ '...'}</p>
                                                  
                                            </div>
                                            <div className={styles.piecesLittle}>{item.quantity} piece(s)</div>
                                        </div>
                                    )})} 
                            </div>
                            { items.length > 5 ? <div className={styles.arrow}></div> : null}
                        </div>
                    <div className={styles.totalContainer}> 
                            <div className={styles.totalInfo}>
                                <span className={styles.total}> Total:</span>
                                <span>{totalPrice} $</span>
                            </div>
                    </div>
                </div>
                <div> 
                        <form className={styles.formCheckout} onSubmit={handleSubmit}>
                            <input name="names" type="text" value={name ? name : "Name"} required/> 
                            <input name="email" type="email" value={email ? email : "Email"} required/> 
                            <input name="tel" type="tel" placeholder="Phone" required/>
                            <input name="address" type="text" placeholder="Address" required/>
                            <button className={styles.payment} type="submit">Proceed to payment</button>
                        </form>
                    
                </div>
                </div>
                    <div className={orderOk ? styles.orderOk : styles.orderHide} >
                        Your order has been successfully created!
                        <button onClick={() => closeModal()} className={styles.upload_button}>OK</button>
                    </div>

            <Footer/>
        </>
    )

    }

export default Checkout;
