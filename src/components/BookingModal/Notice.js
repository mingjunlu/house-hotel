import React from 'react';
import PropTypes from 'prop-types';
import getRoomFeatures from '../../utils/getRoomFeatures';
import css from '../../styles/BookingModal/Notice.module.css';
import crossIcon from '../../assets/icons/cross.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import documentIcon from '../../assets/icons/document.svg';
import smsIcon from '../../assets/icons/sms.svg';
import paymentIcon from '../../assets/icons/payment.svg';

const Notice = ({ toggleModal }) => (
    <article className={css.readme}>
        <button type="button" onClick={toggleModal} className={css.closeButton}>
            <img src={crossIcon} alt="" className={css.closeIcon} />
        </button>
        <div className={css.roomTypeHeading}>
            <h2 className={css.roomType}>Single Room</h2>
            <div className={css.hairline} />
        </div>
        <p className={css.description}>1人・單人床・附早餐・衛浴1間・18平方公尺</p>
        <p className={css.description}>平日（一～四）價格：1380 / 假日（五〜日）價格：1500</p>
        <ul className={css.features}>
            {getRoomFeatures().filter((feat) => feat.exists).map(({ path }) => (
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
                入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。
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

Notice.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};

export default Notice;
