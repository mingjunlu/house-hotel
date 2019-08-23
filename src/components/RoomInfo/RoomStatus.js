import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { DateRange } from 'react-date-range';
import css from '../../styles/RoomInfo/RoomStatus.module.css';
import getRoomFeatures from '../../utils/getRoomFeatures';
import checkMarkIcon from '../../assets/icons/check-mark.svg';
import crossMarkIcon from '../../assets/icons/cross-mark.svg';

const startOfToday = dayjs().startOf('day');

const RoomStatus = (props) => {
    const {
        roomName,
        weekdayPrice,
        weekendPrice,
        startTime,
        endTime,
        updateRange,
    } = props;
    const dateRange = {
        startDate: new Date(startTime),
        endDate: new Date(endTime),
        key: 'pickerRoomInfo',
    };
    return (
        <main className={css.main}>
            <article className={css.room}>
                <div className={css.roomHeader}>
                    <h1 className={css.roomType}>{roomName}</h1>
                    <h2 className={css.roomSpecs}>1人・單人床・附早餐・衛浴1間・18平方公尺</h2>
                </div>
                <div className={css.roomRules}>
                    <p>{`平日（一～四）價格：${weekdayPrice} / 假日（五〜日）價格：${weekendPrice}`}</p>
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
                        maxDate={startOfToday.add(90, 'day').toDate()}
                        rangeColors={['rgba(148, 156, 124, 0.8)']}
                        onChange={updateRange}
                    />
                </div>
            </div>
        </main>
    );
};

RoomStatus.propTypes = {
    roomName: PropTypes.string,
    weekdayPrice: PropTypes.number,
    weekendPrice: PropTypes.number,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    updateRange: PropTypes.func.isRequired,
};

RoomStatus.defaultProps = {
    roomName: '',
    weekdayPrice: 9999,
    weekendPrice: 9999,
    startTime: startOfToday.valueOf(),
    endTime: startOfToday.add(1, 'day').valueOf(),
};

export default RoomStatus;
