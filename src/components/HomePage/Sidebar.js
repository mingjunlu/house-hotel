import React from 'react';
import css from '../../styles/HomePage/Sidebar.module.css';
import logo from '../../assets/homepage/logo.svg';
import BackgroundSlider from './BackgroundSlider';

const designUrl = 'https://challenge.thef2e.com/user/2232?schedule=3968#works-3968';

class Sidebar extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <header className={css.header}>
                <picture className={css.logo}>
                    <img src={logo} alt="logo" />
                </picture>
                <h1 className={css.hotelName}>好室旅店。HOUSE HOTEL</h1>
                <address>
                    <a className={css.address} href="https://goo.gl/maps/UURBnfgJKHEXsYyGA">
                        花蓮縣花蓮市國聯一路1號
                    </a>
                    <a className={css.phone} href="tel:+88638321155">03-8321155</a>
                    <a className={css.email} href="mailto:house@hotel.com">HOUSE@HOTEL.COM</a>
                </address>
                <BackgroundSlider />
                <footer className={css.footer}>
                    <span>UI DESIGN by </span>
                    <a href={designUrl} target="_blank" rel="noopener noreferrer">Pei-Chuan Li</a>
                </footer>
            </header>
        );
    }
}

export default Sidebar;
