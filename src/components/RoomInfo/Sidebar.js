import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from '../../styles/RoomInfo/Sidebar.module.css';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';

const Sidebar = ({ toggleModal, imageUrl }) => (
    <header className={css.header} style={{ backgroundImage: `url("${imageUrl}")` }}>
        <nav className={css.nav}>
            <img src={leftArrowIcon} alt="＜" />
            <Link to="/" className={css.navLink}>查看其它房型</Link>
        </nav>
        <p className={css.price}>
            <span className={css.priceAmount}>$1,380</span>
            <span className={css.pricePerNight}>1晚</span>
        </p>
        <button type="button" className={css.bookRoom} onClick={toggleModal}>Book now</button>
    </header>
);

Sidebar.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    imageUrl: PropTypes.string,
};

Sidebar.defaultProps = {
    imageUrl: '',
};

export default Sidebar;
