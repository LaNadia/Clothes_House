import { FC } from "react";
import {Link } from 'react-router-dom';
import styles from './header.module.css'


const Header: FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logotitle}><Link to="/"> Clothes House</Link></h1>
            <nav className={styles.navigation}>
                <Link to="/trending"> Trending</Link> 
                <Link to="/newarrival"> New Arrival</Link>
                <Link to="/journal"> Journal</Link>
                <Link to="/about"> About Us</Link>
            </nav>
        </header> 
    )
}

export default Header;
