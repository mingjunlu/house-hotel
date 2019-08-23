import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getRoomFeatures from '../../utils/getRoomFeatures';
import css from '../../styles/RoomInfo/Mockup.module.css';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import crossMarkIcon from '../../assets/icons/cross-mark.svg';

const Mockup = ({ roomName }) => (
    <div className={css.container}>
        <div className={css.header}>
            <nav className={css.nav}>
                <img src={leftArrowIcon} alt="＜" />
                <Link to="/" className={css.navLink}>查看其它房型</Link>
            </nav>
        </div>
        <div className={css.main}>
            <div className={css.room}>
                <div className={css.roomHeader}>
                    <p className={css.roomType}>{roomName}</p>
                </div>
            </div>
            <ul className={css.features}>
                {getRoomFeatures(false).map(({ path }) => (
                    <li className={`${css.feature} ${css.featureWithout}`} key={path}>
                        <div className={css.featureIconWrapper}>
                            <img className={css.featureIcon} src={path} alt="" />
                        </div>
                        <img className={css.featureStatus} src={crossMarkIcon} alt="" />
                    </li>
                ))}
            </ul>
            <div className={css.calendar} />
        </div>
    </div>
);

Mockup.propTypes = {
    roomName: PropTypes.string.isRequired,
};

export default Mockup;
