import { FC } from "react";
import Header from "../header/header";
import Footer from "../Footer/Footer";
import { TInfo } from "../../Types";
import styles from './aboutus.module.css'

const AboutUs: FC = () => {

    const info: TInfo[] = [
        {
            name: 'Open Hours',
            insideInfo: 'Every Day from 10 a.m. till 9 p.m.'
        },
        {
            name: 'Address',
            insideInfo: 'Y Block 1101 Blue Area New York, USA'
        },
        {
            name: 'Contacts',
            insideInfo: ' + 1 (123) 456-789'
        },
        {
            name: 'E-mail',
            insideInfo: 'clothesStore@example.com'
        }
    ];

    const showInfo = (item: TInfo) => {
        return (
            <li key={item.name} className={styles.item}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.info} >{item.insideInfo}</div>
            </li>
        )
    }

    const map = `<div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/202/new-york/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Нью‑Йорк</a><a href="https://yandex.ru/maps/202/new-york/?ll=-74.010585%2C40.721712&utm_medium=mapframe&utm_source=maps&z=12.19" style="color:#eee;font-size:12px;position:absolute;top:14px;">Нью‑Йорк — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUVyHWSKA" width="100%" height="300" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div>`;
    const content = info.map(item => showInfo(item)); 

    return (
    <>
        <Header/>
        <ul className={styles.container}>
            {content}
        </ul>
        <div className={styles.map} dangerouslySetInnerHTML={{ __html: `${map}`}}></div>
        <Footer/>
    </>
    )
    }

export default AboutUs;

