import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from '../../styles/RoomInfo/Sidebar.module.css';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import ImageSlider from './ImageSlider';

const Sidebar = (props) => {
    const {
        toggleModal,
        toggleLightbox,
        imageUrls,
        totalAmount,
        nights,
    } = props;
    const openLightbox = (event) => {
        if (event.target.tagName === 'HEADER') {
            toggleLightbox();
        }
    };
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
        <header
            className={css.header}
            onClick={openLightbox}
            tabIndex={-1}
            role="link"
        >
            <nav className={css.nav}>
                <Link to="/" className={css.navLink}>
                    <img src={leftArrowIcon} alt="＜" />
                    <span className={css.navLinkText}>查看其它房型</span>
                </Link>
            </nav>
            <p className={css.price}>
                <span className={css.priceAmount}>{`$${totalAmount.toLocaleString()}`}</span>
                <span className={css.pricePerNight}>{`${nights}晚`}</span>
            </p>
            <button type="button" className={css.bookRoom} onClick={toggleModal}>Book now</button>
            <ImageSlider imageUrls={imageUrls} />
        </header>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events */
};

Sidebar.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    toggleLightbox: PropTypes.func.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalAmount: PropTypes.number.isRequired,
    nights: PropTypes.number.isRequired,
};

export default Sidebar;
