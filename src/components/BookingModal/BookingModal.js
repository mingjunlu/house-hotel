import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/datePicker.css';
import css from '../../styles/BookingModal/BookingModal.module.css';
import successIcon from '../../assets/icons/success.svg';
import errorIcon from '../../assets/icons/error.svg';
import Message from './Message';
import Form from './Form';
import Notice from './Notice';

class BookingModal extends React.Component {
    state = {
        isLoading: false,
        hasError: false,
        isSuccessful: false,
    }

    submitForm = async (formData) => {
        this.setState({ isLoading: true });
        const { roomId } = this.props;
        const apiUrl = `/.netlify/functions/order?room=${roomId}`;
        try {
            await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                },
            });
            this.setState({ isLoading: false, isSuccessful: true });
        } catch (err) {
            this.setState({ isLoading: false, hasError: true });
        }
    }

    render() {
        const {
            toggleModal,
            startTime,
            endTime,
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
        } = this.props;
        const { isLoading, hasError, isSuccessful } = this.state;
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
        return (
            <div className={css.overlay}>
                <div className={css.container}>
                    <Form
                        submitForm={this.submitForm}
                        startTime={startTime}
                        endTime={endTime}
                        weekdayPrice={weekdayPrice}
                        weekendPrice={weekendPrice}
                    />
                    <Notice
                        toggleModal={toggleModal}
                        roomName={roomName}
                        bathrooms={bathrooms}
                        beds={beds}
                        checkInEarly={checkInEarly}
                        checkInLate={checkInLate}
                        checkOut={checkOut}
                        features={features}
                        minGuests={minGuests}
                        maxGuests={maxGuests}
                        size={size}
                        weekdayPrice={weekdayPrice}
                        weekendPrice={weekendPrice}
                    />
                </div>
            </div>
        );
    }
}

BookingModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    startTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    endTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    roomId: PropTypes.string.isRequired,
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

export default BookingModal;
