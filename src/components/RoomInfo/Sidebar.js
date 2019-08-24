import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from '../../styles/RoomInfo/Sidebar.module.css';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import ImageSlider from './ImageSlider';

const Sidebar = (props) => {
    const {
        toggleModal,
        imageUrls,
        totalAmount,
        nights,
    } = props;
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <img src={leftArrowIcon} alt="＜" />
                <Link to="/" className={css.navLink}>查看其它房型</Link>
            </nav>
            <p className={css.price}>
                <span className={css.priceAmount}>{`$${totalAmount.toLocaleString()}`}</span>
                <span className={css.pricePerNight}>{`${nights}晚`}</span>
            </p>
            <button type="button" className={css.bookRoom} onClick={toggleModal}>Book now</button>
            <ImageSlider imageUrls={imageUrls} />
        </header>
    );
};

Sidebar.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalAmount: PropTypes.number.isRequired,
    nights: PropTypes.number.isRequired,
};

export default Sidebar;
