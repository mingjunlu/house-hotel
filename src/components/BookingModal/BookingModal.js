import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/datePicker.css';
import css from '../../styles/BookingModal/BookingModal.module.css';
import successIcon from '../../assets/icons/success.svg';
import errorIcon from '../../assets/icons/error.svg';
import Message from './Message';
import Form from './Form';
import Notice from './Notice';

const fmt = 'YYYY-MM-DD';
const apiUrl = process.env.REACT_APP_API_URL;

class BookingModal extends React.Component {
    state = {
        isLoading: false,
        hasError: false,
        isSuccessful: false,
    }

    submitForm = async (formData) => {
        const { roomId } = this.props;
        this.setState({ isLoading: true });
        const {
            name,
            phone: tel,
            startTime,
            endTime,
        } = formData;
        const date = [dayjs(startTime).format(fmt), dayjs(endTime).format(fmt)];
        try {
            await fetch(`${apiUrl}/room/${roomId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, tel, date }),
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
                    <Notice toggleModal={toggleModal} />
                </div>
            </div>
        );
    }
}

BookingModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    startTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    endTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    weekdayPrice: PropTypes.number.isRequired,
    weekendPrice: PropTypes.number.isRequired,
    roomId: PropTypes.string.isRequired,
};

export default BookingModal;
