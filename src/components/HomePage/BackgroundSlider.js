import React from 'react';
import css from '../../styles/HomePage/BackgroundSlider.module.css';
import firstBgImg from '../../assets/homepage/01.jpg';
import secondBgImg from '../../assets/homepage/02.jpg';
import thirdBgImg from '../../assets/homepage/03.jpg';
import fourthBgImg from '../../assets/homepage/04.jpg';

const images = [
    { key: 'firstBgImg', src: firstBgImg, htmlFor: 'firstButton' },
    { key: 'secondBgImg', src: secondBgImg, htmlFor: 'secondButton' },
    { key: 'thirdBgImg', src: thirdBgImg, htmlFor: 'thirdButton' },
    { key: 'fourthBgImg', src: fourthBgImg, htmlFor: 'fourthButton' },
];

class BackgroundSlider extends React.Component {
    state = {
        isTopImgLoaded: false,
    }

    showAllImages = () => {
        this.setState({ isTopImgLoaded: true });
    }

    render() {
        const { isTopImgLoaded } = this.state;
        return (
            <div className={css.circles}>
                {images.map((image, index) => (index === 0 ? (
                    <label htmlFor={image.htmlFor} className={css.label} key={image.key}>
                        <input
                            type="radio"
                            name="bgImg"
                            id={image.htmlFor}
                            className={css.radio}
                            defaultChecked
                        />
                        <picture className={css.slide} onLoad={this.showAllImages}>
                            <img src={image.src} className={css.image} alt="" />
                        </picture>
                        <div className={css.circle} />
                    </label>
                ) : (
                    <label htmlFor={image.htmlFor} className={css.label} key={image.key}>
                        <input type="radio" name="bgImg" id={image.htmlFor} className={css.radio} />
                        <picture className={css.slide} style={{ opacity: isTopImgLoaded ? 1 : 0 }}>
                            <img src={image.src} className={css.image} alt="" />
                        </picture>
                        <div className={css.circle} />
                    </label>
                )))}
            </div>
        );
    }
}

export default BackgroundSlider;
