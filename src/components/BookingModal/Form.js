import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Calendar } from 'react-date-range';
import calculateBill from '../../utils/calculateBill';
import css from '../../styles/BookingModal/Form.module.css';

const fmt = 'YYYY - MM - DD';
const tomorrow = dayjs().startOf('day').add(1, 'day');

class Form extends React.Component {
    state = {
        name: '',
        phone: '',
        startDate: tomorrow.valueOf(),
        endDate: tomorrow.add(1, 'day').valueOf(),
        isPickingStartDate: false,
        isPickingEndDate: false,
    }

    componentDidMount() {
        const { startTime, endTime } = this.props;
        if (startTime && endTime) {
            this.setState({ startDate: startTime, endDate: endTime });
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
                tempState.endDate = pickedDate.add(1, 'day').valueOf();
            }
            return {
                ...tempState,
                startDate: date.valueOf(),
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
        this.setState({ endDate: date.valueOf(), isPickingEndDate: false });
    }

    updateName = (event) => {
        const { value } = event.target;
        this.setState({ name: value });
    }

    updatePhone = (event) => {
        const rawInput = event.target.value;
        const cleanText = rawInput.replace(/-|\./g, '').trim(); // 去掉小數點和連字號
        const isValid = !Number.isNaN(Number(cleanText)); // 只接受數字
        if (isValid) { this.setState({ phone: cleanText }); }
    }

    preSubmit = (event) => {
        event.preventDefault();
        const { submitForm } = this.props;
        const {
            name,
            phone,
            startDate,
            endDate,
        } = this.state;
        submitForm({
            name,
            phone,
            startTime: startDate,
            endTime: endDate,
        });
    }

    render() {
        const { weekdayPrice, weekendPrice } = this.props;
        const {
            isPickingStartDate,
            isPickingEndDate,
            name,
            phone,
            startDate,
            endDate,
        } = this.state;
        const { totalAmount, nights, weeknights } = calculateBill({
            checkInDate: startDate,
            checkOutDate: endDate,
            weekdayPrice,
            weekendPrice,
        });
        const countsOnWeekday = (weeknights === 0) ? '' : `，${weeknights}晚平日`;
        const countsOnWeekend = (nights === weeknights) ? '' : `，${nights - weeknights}晚假日`;
        const duration = `${nights + 1}天${countsOnWeekday}${countsOnWeekend}`;
        return (
            <div className={css.formWrapper}>
                <form className={css.form} onSubmit={this.preSubmit}>
                    <label htmlFor="name" className={css.label}>
                        <span className={css.labelText}>姓名</span>
                        <input
                            required
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
                            required
                            id="tel"
                            type="text"
                            minLength={10}
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
                            minDate={tomorrow.toDate()}
                            maxDate={tomorrow.add(88, 'day').toDate()}
                            color="rgba(148, 156, 124, 0.8)"
                            date={new Date(startDate)}
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
                            maxDate={tomorrow.add(89, 'day').toDate()}
                            color="rgba(148, 156, 124, 0.8)"
                            date={new Date(endDate)}
                            onChange={this.pickEndDate}
                        />
                    </div>
                    <p className={css.duration}>{duration}</p>
                    <p className={css.inTotal}>總計</p>
                    <p className={css.totalAmount}>{`$${totalAmount}`}</p>
                    <button type="submit" className={css.submit}>確認送出</button>
                    <p className={css.reminder}>此預約系統僅預約功能，並不會對您進行收費</p>
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    submitForm: PropTypes.func.isRequired,
    startTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    endTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    weekdayPrice: PropTypes.number.isRequired,
    weekendPrice: PropTypes.number.isRequired,
};

export default Form;
