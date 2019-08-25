import React from 'react';
import css from '../../styles/HomePage/Sidebar.module.css';
import logo from '../../assets/homepage/logo.svg';
import BackgroundSlider from './BackgroundSlider';

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
            </header>
        );
    }
}

export default Sidebar;
