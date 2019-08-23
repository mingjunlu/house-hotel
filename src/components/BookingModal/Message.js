import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles/BookingModal/Message.module.css';
import crossIcon from '../../assets/icons/white-cross.svg';

const Message = ({
    toggleModal,
    iconPath,
    title,
    sentences,
}) => (
    <div className={css.overlay}>
        <div className={css.container}>
            {title !== '請稍候' && (
                <button type="button" onClick={toggleModal} className={css.closeButton}>
                    <img src={crossIcon} alt="" className={css.closeIcon} />
                </button>
            )}
            <div className={css.messageIcon}>
                {title !== '請稍候' ? (<img src={iconPath} alt="" />) : (
                    <React.Fragment>
                        <div className={`${css.circle} ${css.circleOne}`} />
                        <div className={`${css.circle} ${css.circleTwo}`} />
                        <div className={`${css.circle} ${css.circleThree}`} />
                    </React.Fragment>
                )}
            </div>
            <h2 className={css.messageTitle}>{title}</h2>
            <div className={css.messageTextContainer}>
                {(sentences.length > 0) && sentences.map((sentence) => (
                    <p className={css.messageText} key={sentence}>{sentence}</p>
                ))}
            </div>
        </div>
    </div>
);

Message.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    iconPath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sentences: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Message;
