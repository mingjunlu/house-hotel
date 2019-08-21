import React from 'react';
import styles from '../styles/HomePage.module.css';
import logo from '../assets/homepage/logo.svg';

const HomePage = () => (
    <div className={styles.background}>
        <div className={styles.container}>
            <header className={styles.header}>
                <picture className={styles.logo}>
                    <img src={logo} alt="logo" />
                </picture>
                <h1 className={styles.hotelName}>好室旅店。HOUSE HOTEL</h1>
                <address>
                    <a className={styles.address} href="https://goo.gl/maps/UURBnfgJKHEXsYyGA">
                        花蓮縣花蓮市國聯一路1號
                    </a>
                    <a className={styles.phone} href="tel:+88638321155">03-8321155</a>
                    <a className={styles.email} href="mailto:house@hotel.com">HOUSE@HOTEL.COM</a>
                </address>
            </header>
            <main className={styles.gallery}>
                <a href="/#" className={`${styles.room} ${styles.singleRoom}`}>
                    <span className={styles.roomName}>Single Room</span>
                </a>
                <a href="/#" className={`${styles.room} ${styles.doubleRoom}`}>
                    <span className={styles.roomName}>Double Room</span>
                </a>
                <a href="/#" className={`${styles.room} ${styles.twinRoom}`}>
                    <span className={styles.roomName}>Twin Room</span>
                </a>
                <a href="/#" className={`${styles.room} ${styles.deluxeSingleRoom}`}>
                    <span className={styles.roomName}>Deluxe Single Room</span>
                </a>
                <a href="/#" className={`${styles.room} ${styles.deluxeDoubleRoom}`}>
                    <span className={styles.roomName}>Deluxe Double Room</span>
                </a>
                <a href="/#" className={`${styles.room} ${styles.deluxeTwinRoom}`}>
                    <span className={styles.roomName}>Deluxe Twin Room</span>
                </a>
            </main>
        </div>
    </div>
);

export default HomePage;
