import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles/HomePage/HomePage.module.css';
import Sidebar from './Sidebar';
import Gallery from './Gallery';

const HomePage = ({ rooms }) => (
    <div className={css.background}>
        <div className={css.container}>
            <Sidebar />
            <Gallery rooms={rooms} />
        </div>
    </div>
);

HomePage.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        path: PropTypes.string,
        weekdayPrice: PropTypes.number,
        weekendPrice: PropTypes.number,
    })).isRequired,
};

export default HomePage;
