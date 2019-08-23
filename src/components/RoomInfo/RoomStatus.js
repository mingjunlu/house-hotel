import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { DateRange } from 'react-date-range';
import css from '../../styles/RoomInfo/RoomStatus.module.css';
import getRoomFeatures from '../../utils/getRoomFeatures';
import getRoomAbstract from '../../utils/getRoomAbstract';
import checkMarkIcon from '../../assets/icons/check-mark.svg';
import crossMarkIcon from '../../assets/icons/cross-mark.svg';

const startOfToday = dayjs().startOf('day');

const RoomStatus = (props) => {
    const {
        updateRange,
        startTime,
        endTime,
        roomName,
        bathrooms,
        beds,
        checkInEarly,
        checkInLate,
        checkOut,
        details,
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
                    <h2 className={css.roomSpecs}>{roomSpecs}</h2>
                </div>
                <div className={css.roomRules}>
                    <p>{`平日（一～四）價格：${weekdayPrice} / 假日（五〜日）價格：${weekendPrice}`}</p>
                    <p>{`入住時間：${checkInEarly}（最早）/ ${checkInLate}（最晚）`}</p>
                    <p>{`退房時間：${checkOut}`}</p>
                </div>
                <ul className={css.roomDetails}>
                    {details.split('；').map((sentence) => (
                        <li key={sentence}>{`${sentence}.`}</li>
                    ))}
                </ul>
                <ul className={css.features}>
                    {getRoomFeatures(features).map(({ exists, path }) => {
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
    updateRange: PropTypes.func.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    roomName: PropTypes.string.isRequired,
    bathrooms: PropTypes.number.isRequired,
    beds: PropTypes.number.isRequired,
    checkInEarly: PropTypes.string.isRequired,
    checkInLate: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
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

export default RoomStatus;
