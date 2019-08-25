import React from 'react';
import PropTypes from 'prop-types';
import css from '../../styles/RoomInfo/ImageSlider.module.css';

class ImageSlider extends React.Component {
    state = {
        isTopImgLoaded: false,
    }

    showAllImages = () => {
        this.setState({ isTopImgLoaded: true });
    }

    render() {
        const { imageUrls } = this.props;
        const { isTopImgLoaded } = this.state;
        if (imageUrls.length < 1) { return null; }
        const croppedImages = imageUrls.map((url) => `${url}&w=573&h=1068`);
        return (
            <div className={css.circles}>
                <label htmlFor="firstButton" className={css.label}>
                    <input
                        type="radio"
                        name="image"
                        id="firstButton"
                        className={css.radio}
                        defaultChecked
                    />
                    <picture className={css.slide} onLoad={this.showAllImages}>
                        <img src={croppedImages[0]} className={css.image} alt="" />
                    </picture>
                    <div className={css.circle} />
                </label>
                <label htmlFor="secondButton" className={css.label}>
                    <input type="radio" name="image" id="secondButton" className={css.radio} />
                    <picture className={css.slide} style={{ opacity: isTopImgLoaded ? 1 : 0 }}>
                        <img src={croppedImages[1]} className={css.image} alt="" />
                    </picture>
                    <div className={css.circle} />
                </label>
                <label htmlFor="thirdButton" className={css.label}>
                    <input type="radio" name="image" id="thirdButton" className={css.radio} />
                    <picture className={css.slide} style={{ opacity: isTopImgLoaded ? 1 : 0 }}>
                        <img src={croppedImages[2]} className={css.image} alt="" />
                    </picture>
                    <div className={css.circle} />
                </label>
            </div>
        );
    }
}

ImageSlider.propTypes = {
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
