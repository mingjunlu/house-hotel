import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from '../../styles/HomePage/Gallery.module.css';

const Gallery = ({ rooms }) => {
    const hasRooms = (rooms.length > 0);
    return (
        <main className={css.gallery} style={{ ...(hasRooms ? {} : { boxShadow: 'none' }) }}>
            {hasRooms && rooms.map((room) => {
                const {
                    id,
                    name,
                    path,
                    imageUrl,
                } = room;
                const destination = { pathname: path, state: { roomId: id, roomName: name } };
                return (
                    <Link key={room.id} to={destination} className={css.room}>
                        <picture className={css.imgWrapper}>
                            <img src={imageUrl} alt="" />
                        </picture>
                        <span className={css.roomName}>{room.name}</span>
                    </Link>
                );
            })}
        </main>
    );
};

Gallery.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        path: PropTypes.string,
    })).isRequired,
};

export default Gallery;
