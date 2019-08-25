import React from 'react';
import PropTypes from 'prop-types';
import getRoomFeatures from '../../utils/getRoomFeatures';
import getRoomAbstract from '../../utils/getRoomAbstract';
import css from '../../styles/BookingModal/Notice.module.css';
import crossIcon from '../../assets/icons/cross.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import documentIcon from '../../assets/icons/document.svg';
import smsIcon from '../../assets/icons/sms.svg';
import paymentIcon from '../../assets/icons/payment.svg';

const Notice = (props) => {
    const {
        toggleModal,
        roomName,
        bathrooms,
        beds,
        checkInEarly,
        checkInLate,
        checkOut,
        features,
        minGuests,
        maxGuests,
        size,
        weekdayPrice,
        weekendPrice,
    } = props;
    const roomSpecs = getRoomAbstract({
        bathrooms,
        beds,
        features,
        minGuests,
        maxGuests,
        size,
    });
    return (
        <article className={css.readme}>
            <button type="button" onClick={toggleModal} className={css.closeButton}>
                <img src={crossIcon} alt="" className={css.closeIcon} />
            </button>
            <div className={css.roomTypeHeading}>
                <h2 className={css.roomType}>{roomName}</h2>
                <div className={css.hairline} />
            </div>
            <p className={css.description}>{roomSpecs}</p>
            <p className={css.description}>
                {`平日（一～四）價格：${weekdayPrice} / 假日（五〜日）價格：${weekendPrice}`}
            </p>
            <ul className={css.features}>
                {getRoomFeatures(features).filter((feat) => feat.exists).map(({ path }) => (
                    <li className={css.feature} key={path}>
                        <img className={css.featureIcon} src={path} alt="" />
                    </li>
                ))}
            </ul>
            <div className={css.roomRulesHeading}>
                <h3 className={css.headingTitle}>訂房資訊</h3>
                <div className={css.hairline} />
            </div>
            <ul className={css.roomRules}>
                <li className={css.roomRule}>
                    {`入住時間：最早${checkInEarly}，最晚${checkInLate}；退房時間：${checkOut}，請自行確認行程安排。`}
                </li>
                <li className={css.roomRule}>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
                <li className={css.roomRule}>好室旅店全面禁止吸菸。</li>
                <li className={css.roomRule}>
                    若您有任何問題，歡迎撥打 03-8321155（服務時間 週一至週六 10:00 - 18:00）。
                </li>
            </ul>
            <div className={css.stepsHeading}>
                <h3 className={css.headingTitle}>預約流程</h3>
                <div className={css.hairline} />
            </div>
            <div className={css.steps}>
                <div className={css.step}>
                    <div className={css.stepIconWrapper}>
                        <img className={css.stepIcon} src={documentIcon} alt="" />
                    </div>
                    <div className={css.stepTextContainer}>
                        <p className={css.stepText}>送出線上預約單</p>
                    </div>
                </div>
                <div className={css.arrowWrapper}>
                    <img src={rightArrow} alt="" />
                </div>
                <div className={css.step}>
                    <div className={css.stepIconWrapper}>
                        <img className={css.stepIcon} src={smsIcon} alt="" />
                    </div>
                    <div className={css.stepTextContainer}>
                        <p className={css.stepText}>系統立即回覆是否預訂成功</p>
                        <p className={css.stepText}>並以簡訊發送訂房通知</p>
                        <p className={css.stepText}>（若未收到簡訊請來電確認）</p>
                    </div>
                </div>
                <div className={css.arrowWrapper}>
                    <img src={rightArrow} alt="" />
                </div>
                <div className={css.step}>
                    <div className={css.stepIconWrapper}>
                        <img className={css.stepIcon} src={paymentIcon} alt="" />
                    </div>
                    <div className={css.stepTextContainer}>
                        <p className={css.stepText}>入住當日憑訂房通知</p>
                        <p className={css.stepText}>以現金或刷卡付款即可</p>
                        <p className={css.stepText}>（僅接受VISA.JCB.銀聯卡）</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

Notice.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    roomName: PropTypes.string.isRequired,
    bathrooms: PropTypes.number.isRequired,
    beds: PropTypes.number.isRequired,
    checkInEarly: PropTypes.string.isRequired,
    checkInLate: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    features: PropTypes.shape({
        /* eslint-disable quote-props */
        'Wi-Fi': PropTypes.bool,
        'Breakfast': PropTypes.bool,
        'Mini-Bar': PropTypes.bool,
        'Room-Service': PropTypes.bool,
        'Television': PropTypes.bool,
        'Air-Conditioner': PropTypes.bool,
        'Refrigerator': PropTypes.bool,
        'Sofa': PropTypes.bool,
        'Great-View': PropTypes.bool,
        'Smoke-Free': PropTypes.bool,
        'Child-Friendly': PropTypes.bool,
        'Pet-Friendly': PropTypes.bool,
        /* eslint-enable */
    }).isRequired,
    minGuests: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    weekdayPrice: PropTypes.number.isRequired,
    weekendPrice: PropTypes.number.isRequired,
};

export default Notice;
