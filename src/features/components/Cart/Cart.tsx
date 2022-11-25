import { FC, useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../header/header";
import Footer from "../Footer/Footer";
import { rootReducer } from "../../../app/store";
import { useAuth } from "app/hooks/user-auth";
import { useAppSelector, useAppDispatch } from "../../../app/hooks/hooks";
import { getShoppingItems } from "../../../app/reducers/getItems";
import { TCard } from "../../Types";
import Spinner from "../spinner/spinner";
import styles from './cart.module.css';



const Cart: FC = (): React.ReactElement => {

    type IRootState = ReturnType<typeof rootReducer>
    const shoppingItems: TCard[] = useAppSelector((state: IRootState) => state.shoppingList.items);
    const dispatch = useAppDispatch();

    const [items, setItems] = useState<TCard[]>([]);
    const [isLoading, setisLoading] = useState<Boolean>(false);

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
     
            setisLoading(true);
            setItems(shoppingItems)
            setisLoading(false);
        
    });

    const deleteItem = (id: number, items:TCard[]):void => {
     
            let deleteItem = items.filter(item => item.id === id)[0];
            let array = [...items]
            let itemsLeft = array.filter(item => item.id !== deleteItem.id);
           
            dispatch(getShoppingItems(itemsLeft));
    };

    const showItems = (items: TCard[]):  JSX.Element => {          
          let totalPrice = items.reduce(function (previousValue, item) {               
            if(item.quantity){
           return previousValue + (Number(item.price) * item.quantity)
            } else return 0;
          }, 0).toFixed(2);

            return (
                <div className={styles.wrapper} >
                    <div className={styles.content}>
                        <div className={styles.mycart}> My cart</div>
                        {items.map(function(item: TCard) {
                            return (
                                <div key={item.id} className={styles.item}>
                                    <div>
                                        <div>
                                            <img src={item.image} alt={item.title}/>
                                        </div>
                                    </div>
                                    <div className={styles.itemInfo}>
                                            <p>{item.price} $ per piece</p>
                                            <p>{item.title}</p>
                                            <div className={styles.quantity}>
                                                <button onClick={()=> minusItem(item.id)}
                                                    disabled={item.quantity === 1 ? true : false} 
                                                    className={`${styles.minus} ${document.querySelector('.minus')?.getAttribute('disabled') ? styles.disab : ''}`}
                                                ></button>
                                                <div>{item.quantity} piece(s)</div>
                                                <button onClick={()=> plusItem(item.id)} className={styles.plus}></button>
                                            </div>
                                    </div>
                                    
                                    <button onClick={()=> deleteItem(item.id, items)}>✕</button>
                                </div>
                            )})}
                        </div>
                        <div className={styles.totalContainer}> 
                            <div className={styles.totalInfo}>
                                <span className={styles.total}> Total:</span>
                                <span>{totalPrice} $</span>
                                <button className={styles.checkout} onClick={()=> onCheckout()}>Checkout</button>
                            </div>
                        </div>
                    
                </div>
        )
    };

    const plusItem = (id: number):void => {
        let array = JSON.parse(JSON.stringify(items)); 
        let item2 = array.filter((item: { id: number; }) => item.id === id)[0];

        if(item2.quantity){
            item2.quantity = item2.quantity + 1;
          dispatch(getShoppingItems(array));
       };
    }

    const minusItem = (id: number):void => {
        let array = JSON.parse(JSON.stringify(items)); 
        let item2 = array.filter((item: { id: number; }) => item.id === id)[0];

        if(item2.quantity !== 1){
            item2.quantity = item2.quantity - 1;
          dispatch(getShoppingItems(array));
        } else {
            console.log()
        }
    }
    
    const onCheckout = () => {
        isAuth ? navigate('/checkout') : navigate('/login');
    }
    

    const noitems = (): React.ReactElement =>  <div className={styles.wrapper}>
                                                    <div className={styles.emptycart}>Your cart is empty.</div>
                                                </div>;
    const content: JSX.Element | null = items && items.length > 0 ?  showItems(items) : null;

    const loading = isLoading? <Spinner/> : null;

        return (
            <>
            <Header/>
                {content ? content : noitems()}
                {loading}            
            <Footer/>
            </>
        )
}


export default Cart;