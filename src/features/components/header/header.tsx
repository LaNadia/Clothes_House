import { FC, useState } from "react";
import {Link, useLocation } from 'react-router-dom';
import { useAuth } from "app/hooks/user-auth";
import { deleteUser } from "app/reducers/user";
import { useAppDispatch } from "app/hooks/hooks";
import CartIcon from "../cartIcon/CartIcon";
import styles from './header.module.css';
import { getShoppingItems } from "app/reducers/getItems";


const Header: FC = () => {

    const location: string = useLocation().pathname;
    const [open, setOpen] = useState<Boolean>(false)
    const { isAuth } = useAuth();
    const dispatch = useAppDispatch();
   

    return (
        <header className={styles.header}>
            <h1 className={styles.logotitle}><Link to="/"> Clothes House</Link></h1>
            <nav className={styles.navigation}>
                <Link to="/trending"> Trending</Link> 
                <Link to="/newarrival"> New Arrival</Link>
                <Link to="/journal"> Journal</Link>
                <Link to="/about"> About Us</Link>
          
            
            {  location === "/login" || location === "/register" || isAuth ? null
               : <Link to="/login" className={styles.login}> Login</Link>
            }
            {
                isAuth? 
                <div>
                    <button
                      className={`${styles.myAccount} ${open? styles.myAccount2 : ''}`}
                      onClick={()=> setOpen(!open)}               
                    >My profile
                    </button> 
                    <ul className={`${styles.menu} ${open? '' : styles.hide}`}>
                        <li><Link to="/myprofile">Me</Link></li>
                        <li><Link to="/" onClick={()=> {dispatch(getShoppingItems([])); dispatch(deleteUser())}}/>Logout</li>
                    </ul>
                </div>  

                : null
            }

        </nav>
            {  location === "/cart" || location === "/login" || location === "/register" || location === "/checkout"? null
               : <CartIcon/>
            }
        </header> 
    )
}

export default Header;
