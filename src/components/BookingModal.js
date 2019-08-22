import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Calendar } from 'react-date-range';
import getRoomFeatures from '../utils/getRoomFeatures';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/datePicker.css';
import css from '../styles/BookingModal.module.css';
import successIcon from '../assets/icons/success.svg';
import errorIcon from '../assets/icons/error.svg';
import crossIcon from '../assets/icons/cross.svg';
import rightArrow from '../assets/icons/right-arrow.svg';
import documentIcon from '../assets/icons/document.svg';
import smsIcon from '../assets/icons/sms.svg';
import paymentIcon from '../assets/icons/payment.svg';
import Message from './Message';

const fmt = 'YYYY - MM - DD';

class BookingModal extends React.Component {
    state = {
        name: '',
        phone: '',
        startDate: dayjs().startOf('day').toDate(),
        endDate: dayjs().startOf('day').add(1, 'day').toDate(),
        isPickingStartDate: false,
        isPickingEndDate: false,
        isLoading: false,
        hasError: false,
        isSuccessful: false,
    }

    componentDidMount() {
        const { startTime, endTime } = this.props;
        const { startDate, endDate } = this.state;
        const isSameStart = dayjs(startTime).isSame(dayjs(startDate), 'day');
        const isSameEnd = dayjs(endTime).isSame(dayjs(endDate), 'day');
        if (!isSameStart || !isSameEnd) {
            this.setState({
                startDate: new Date(startTime),
                endDate: new Date(endTime),
            });
        }
    }

    updateName = (event) => {
        const { value } = event.target;
        this.setState({ name: value });
    }

    updatePhone = (event) => {
        const rawInput = event.target.value;
        const cleanText = rawInput.replace(/-|\./g, '').trim(); // 去掉小數點和連字號
        if (!Number.isNaN(Number(cleanText))) {
            // 只接受數字
            this.setState({ phone: cleanText });
        }
    }

    toggleStartDatePicker = () => {
        this.setState((prevState) => ({
            isPickingStartDate: !prevState.isPickingStartDate,
            isPickingEndDate: false,
        }));
    }

    pickStartDate = (date) => {
        const pickedDate = dayjs(date);
        this.setState((prevState) => {
            const tempState = {};
            const isSame = pickedDate.isSame(dayjs(prevState.endDate), 'day');
            const isAfter = pickedDate.isAfter(dayjs(prevState.endDate), 'day');
            if (isSame || isAfter) {
                tempState.endDate = pickedDate.add(1, 'day').toDate();
            }
            return {
                ...tempState,
                startDate: date,
                isPickingStartDate: false,
            };
        });
    }

    toggleStartEndPicker = () => {
        this.setState((prevState) => ({
            isPickingStartDate: false,
            isPickingEndDate: !prevState.isPickingEndDate,
        }));
    }

    pickEndDate = (date) => {
        this.setState({ endDate: date, isPickingEndDate: false });
    }

    submitForm = (event) => {
        event.preventDefault();
    }

    render() {
        const { toggleModal } = this.props;
        const {
            name,
            phone,
            startDate,
            endDate,
            isPickingStartDate,
            isPickingEndDate,
            isLoading,
            hasError,
            isSuccessful,
        } = this.state;

        if (hasError) {
            return (
                <Message
                    toggleModal={toggleModal}
                    iconPath={errorIcon}
                    title="預約失敗"
                    sentences={['哎呀！晚了一步！您預約的日期已經被預約走了，', '再看看其它房型吧']}
                />
            );
        }
        if (isSuccessful) {
            return (
                <Message
                    toggleModal={toggleModal}
                    iconPath={successIcon}
                    title="預約成功"
                    sentences={['請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，', '若未收到簡訊請來電確認，謝謝您']}
                />
            );
        }
        if (isLoading) { return <Message title="請稍候" sentences={['系統正在為您預約，請耐心等候']} />; }

        const duration = dayjs(endDate).diff(dayjs(startDate), 'day') + 1;
        return (
            <div className={css.overlay}>
                <div className={css.container}>
                    <div className={css.formWrapper}>
                        <form className={css.form} onSubmit={this.submitForm}>
                            <label htmlFor="name" className={css.label}>
                                <span className={css.labelText}>姓名</span>
                                <input
                                    id="name"
                                    type="text"
                                    className={css.input}
                                    autoComplete="off"
                                    value={name}
                                    onChange={this.updateName}
                                />
                            </label>
                            <label htmlFor="tel" className={css.label}>
                                <span className={css.labelText}>手機號碼</span>
                                <input
                                    id="tel"
                                    type="text"
                                    maxLength={10}
                                    className={css.input}
                                    autoComplete="off"
                                    value={phone}
                                    onChange={this.updatePhone}
                                />
                            </label>
                            <p className={css.label}>
                                <span className={css.labelText}>入住日期</span>
                                <button type="button" className={css.input} onClick={this.toggleStartDatePicker}>
                                    {dayjs(startDate).format(fmt)}
                                </button>
                            </p>
                            <div className={css.datePicker} style={{ display: isPickingStartDate ? 'block' : null }}>
                                <Calendar
                                    showMonthAndYearPickers={false}
                                    minDate={new Date()}
                                    maxDate={dayjs().add(90, 'day').toDate()}
                                    color="rgba(148, 156, 124, 0.8)"
                                    date={startDate}
                                    onChange={this.pickStartDate}
                                />
                            </div>
                            <p className={css.label}>
                                <span className={css.labelText}>退房日期</span>
                                <button type="button" className={css.input} onClick={this.toggleStartEndPicker}>
                                    {dayjs(endDate).format(fmt)}
                                </button>
                            </p>
                            <div className={css.datePicker} style={{ display: isPickingEndDate ? 'block' : null }}>
                                <Calendar
                                    showMonthAndYearPickers={false}
                                    minDate={dayjs(startDate).add(1, 'day').toDate()}
                                    maxDate={dayjs().add(90, 'day').toDate()}
                                    color="rgba(148, 156, 124, 0.8)"
                                    date={endDate}
                                    onChange={this.pickEndDate}
                                />
                            </div>
                            <p className={css.duration}>{`${duration}天，1晚平日`}</p>
                            <p className={css.inTotal}>總計</p>
                            <p className={css.totalAmount}>$1,380</p>
                            <button type="submit" className={css.submit}>確認送出</button>
                            <p className={css.reminder}>此預約系統僅預約功能，並不會對您進行收費</p>
                        </form>
                    </div>
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
                            <li className={css.roomRule}>入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。</li>
                            <li className={css.roomRule}>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
                            <li className={css.roomRule}>好室旅店全面禁止吸菸。</li>
                            <li className={css.roomRule}>若您有任何問題，歡迎撥打 03-8321155（服務時間 週一至週六 10:00 - 18:00）。</li>
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
                </div>
            </div>
        );
    }
}

BookingModal.propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    toggleModal: PropTypes.func,
};

BookingModal.defaultProps = {
    startTime: new Date().valueOf(),
    endTime: dayjs().add(1, 'day').valueOf(),
    toggleModal: () => undefined,
};

export default BookingModal;
