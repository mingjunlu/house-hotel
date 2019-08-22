import React from 'react';
import dayjs from 'dayjs';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/datePicker.css';
import css from '../styles/RoomInfo.module.css';
import getRoomFeatures from '../utils/getRoomFeatures';
import leftArrowIcon from '../assets/icons/left-arrow.svg';
import checkMarkIcon from '../assets/icons/check-mark.svg';
import crossMarkIcon from '../assets/icons/cross-mark.svg';
import BookingModal from './BookingModal';

class RoomInfo extends React.Component {
    state = {
        startDate: dayjs().startOf('day').toDate(),
        endDate: dayjs().startOf('day').add(1, 'day').toDate(),
        isModalOpen: false,
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
    }

    updateRange = ({ pickerRoomInfo }) => {
        this.setState({
            startDate: pickerRoomInfo.startDate,
            endDate: pickerRoomInfo.endDate,
        });
    }

    render () {
        const { startDate, endDate, isModalOpen } = this.state;
        const dateRange = { startDate, endDate, key: 'pickerRoomInfo' };
        return (
            <React.Fragment>
                {isModalOpen && (
                    <BookingModal
                        toggleModal={this.toggleModal}
                        startTime={startDate.valueOf()}
                        endTime={endDate.valueOf()}
                    />
                )}
                <div
                    className={css.container}
                    style={{ ...(isModalOpen ? { maxHeight: '100vh', overflow: 'hidden' } : {}) }}
                >
                    <header className={css.header}>
                        <nav className={css.nav}>
                            <img src={leftArrowIcon} alt="＜" />
                            <a href="/#" className={css.navLink}>查看其它房型</a>
                        </nav>
                        <p className={css.price}>
                            <span className={css.priceAmount}>$1,380</span>
                            <span className={css.pricePerNight}>1晚</span>
                        </p>
                        <button type="button" className={css.bookRoom} onClick={this.toggleModal}>
                            Book now
                        </button>
                    </header>
                    <main className={css.main}>
                        <article className={css.room}>
                            <h1 className={css.roomType}>Single Room</h1>
                            <h2 className={css.roomSpecs}>1人・單人床・附早餐・衛浴1間・18平方公尺</h2>
                            <div className={css.roomRules}>
                                <p>平日（一～四）價格：1380 / 假日（五〜日）價格：1500</p>
                                <p>入住時間：15:00（最早）/ 21:00（最晚）</p>
                                <p>退房時間：10:00</p>
                            </div>
                            <ul className={css.roomDetails}>
                                <li>單人間僅供一位客人使用。</li>
                                <li>臥室配有單人床和私人浴室。 </li>
                                <li>您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。</li>
                                <li>房間裡有AC，當然還有WiFi。</li>
                            </ul>
                            <ul className={css.features}>
                                {getRoomFeatures().map(({ exists, path }) => {
                                    let [liClass, imgSrc] = [css.feature, checkMarkIcon];
                                    if (!exists) {
                                        liClass = `${css.feature} ${css.featureWithout}`;
                                        imgSrc = crossMarkIcon;
                                    }
                                    return (
                                        <li className={liClass} key={path}>
                                            <div className={css.featureIconWrapper}>
                                                <img className={css.featureIcon} src={path} alt="" />
                                            </div>
                                            <img className={css.featureStatus} src={imgSrc} alt="" />
                                        </li>
                                    );
                                })}
                            </ul>
                        </article>
                        <div>
                            <h2 className={css.availability}>空房狀態查詢</h2>
                            <div className={css.calendar}>
                                <DateRange
                                    months={2}
                                    direction="horizontal"
                                    showMonthAndYearPickers={false}
                                    showDateDisplay={false}
                                    ranges={[dateRange]}
                                    minDate={new Date()}
                                    maxDate={dayjs().add(90, 'day').toDate()}
                                    rangeColors={['rgba(148, 156, 124, 0.8)']}
                                    onChange={this.updateRange}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default RoomInfo;
