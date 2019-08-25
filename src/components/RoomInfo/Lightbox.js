import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles/RoomInfo/Lightbox.module.css';
import leftArrowIcon from '../../assets/icons/big-left-arrow.svg';
import rightArrowIcon from '../../assets/icons/big-right-arrow.svg';

class Lightbox extends React.Component {
    state = {
        selectedIndex: 0,
    }

    selectPrevImg = () => {
        this.setState((prevState) => ({
            selectedIndex: prevState.selectedIndex - 1,
        }));
    }

    selectNextImg = () => {
        this.setState((prevState) => ({
            selectedIndex: prevState.selectedIndex + 1,
        }));
    }

    detectEscape = (event) => {
        if (event.keyCode === 27) {
            const { toggleLightbox } = this.props;
            toggleLightbox();
        }
    }

    detectBlur = (event) => {
        const { tagName, src } = event.target;
        const isDiv = (tagName === 'DIV');
        const isImg = (tagName === 'IMG' && src.includes('unsplash'));
        if (isDiv || isImg) {
            const { toggleLightbox } = this.props;
            toggleLightbox();
        }
    }

    render() {
        const { imageUrls } = this.props;
        const { selectedIndex } = this.state;
        const croppedImages = imageUrls.map((url) => `${url}&h=800`);
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <div
                className={css.overlay}
                onClick={this.detectBlur}
                onKeyUp={this.detectEscape}
                tabIndex={-1}
                role="dialog"
            >
                <div className={css.container}>
                    <button
                        type="button"
                        className={css.button}
                        onClick={this.selectPrevImg}
                        disabled={selectedIndex === 0}
                    >
                        <img src={leftArrowIcon} alt="" />
                    </button>
                    <div className={css.pictures}>
                        {(croppedImages.length > 0) && croppedImages.map((url, index) => (
                            <picture
                                key={url}
                                className={css.picture}
                                style={{ display: (index === selectedIndex) ? null : 'none' }}
                            >
                                <img src={url} className={css.image} alt="" />
                            </picture>
                        ))}
                    </div>
                    <button
                        type="button"
                        className={css.button}
                        onClick={this.selectNextImg}
                        disabled={selectedIndex === (croppedImages.length - 1)}
                    >
                        <img src={rightArrowIcon} alt="" />
                    </button>
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}

Lightbox.propTypes = {
    toggleLightbox: PropTypes.func.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Lightbox;
