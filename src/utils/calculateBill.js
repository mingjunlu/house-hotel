import dayjs from 'dayjs';

const calculateBill = (tripInfo = {}) => {
    const {
        checkInDate,
        checkOutDate,
        weekdayPrice,
        weekendPrice,
    } = tripInfo;

    const nights = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
    const totalAmount = [...Array(nights).keys()]
        .map((num) => dayjs(checkInDate).add(num, 'day').day())
        .reduce((total, current) => {
            if ((current > 0) && (current < 5)) {
                return (total + weekdayPrice);
            }
            return (total + weekendPrice);
        }, 0);

    return { totalAmount, nights };
};

export default calculateBill;
