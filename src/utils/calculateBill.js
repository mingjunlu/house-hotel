import dayjs from 'dayjs';

const calculateBill = (tripInfo = {}) => {
    const {
        checkInDate,
        checkOutDate,
        weekdayPrice,
        weekendPrice,
    } = tripInfo;

    const nights = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
    const days = [...Array(nights).keys()].map((num) => dayjs(checkInDate).add(num, 'day').day())

    const counter = { weeknights: 0 };
    days.forEach((day) => {
        const isWeeknight = (day > 0) && (day < 5);
        if (isWeeknight) { counter.weeknights += 1; }
    });
    const { weeknights } = counter;

    const totalAmount = (weeknights * weekdayPrice) + ((nights - weeknights) * weekendPrice);
    return { totalAmount, nights, weeknights };
};

export default calculateBill;
