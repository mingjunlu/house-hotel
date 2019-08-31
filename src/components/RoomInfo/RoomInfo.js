import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import calculateBill from '../../utils/calculateBill';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/datePicker.css';
import css from '../../styles/RoomInfo/RoomInfo.module.css';
import Mockup from './Mockup';
import BookingModal from '../BookingModal/BookingModal';
import Lightbox from './Lightbox';
import Sidebar from './Sidebar';
import RoomStatus from './RoomStatus';

const tomorrow = dayjs().startOf('day').add(1, 'day');

class RoomInfo extends React.Component {
    state = {
        startDate: tomorrow.valueOf(),
        endDate: tomorrow.add(1, 'day').valueOf(),
        isModalOpen: false,
        isLightboxOpen: false,
        isLoading: true,
        // hasError: false,
        imageUrls: [],
        info: {},
        // reservations: [],
    }

    async componentDidMount() {
        const { location: { state: locationState } } = this.props;
        if (locationState) {
            const { roomId } = locationState;
            try {
                const resp = await axios.get(`/.netlify/functions/room?id=${roomId}`);
                const { imageUrls, info } = resp.data;
                this.setState({
                    imageUrls,
                    info,
                    // reservations,
                    isLoading: false,
                });
            } catch (err) {
                this.setState({
                    // hasError: true,
                    isLoading: false,
                });
            }
        }
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
    }

    toggleLightbox = () => {
        this.setState((prevState) => ({
            isLightboxOpen: !prevState.isLightboxOpen,
        }));
    }

    updateRange = ({ pickerRoomInfo }) => {
        this.setState({
            startDate: pickerRoomInfo.startDate.valueOf(),
            endDate: pickerRoomInfo.endDate.valueOf(),
        });
    }

    render () {
        const { location: { state: locationState } } = this.props;
        if (!locationState) { return <Redirect to="/" />; }
        const { roomId, roomName } = locationState;
        const {
            startDate,
            endDate,
            isModalOpen,
            isLightboxOpen,
            isLoading,
            // hasError,
            imageUrls,
            info,
            // reservations,
        } = this.state;
        if (isLoading) { return <Mockup roomName={roomName} />; }
        const hasDifferentStartDate = !dayjs(startDate).isSame(dayjs(), 'day');
        const hasDifferentEndDate = !dayjs(endDate).isSame(dayjs().add(1, 'day'));
        const hasDifferentRange = (hasDifferentStartDate || hasDifferentEndDate);
        const { totalAmount, nights } = calculateBill({
            checkInDate: startDate,
            checkOutDate: endDate,
            weekdayPrice: info.weekdayPrice,
            weekendPrice: info.weekendPrice,
        });
        return (
            <React.Fragment>
                {isModalOpen && (
                    <BookingModal
                        toggleModal={this.toggleModal}
                        roomId={roomId}
                        startTime={hasDifferentRange && startDate}
                        endTime={hasDifferentRange && endDate}
                        roomName={roomName}
                        bathrooms={info.bathrooms}
                        beds={info.beds}
                        checkInEarly={info.checkInEarly}
                        checkInLate={info.checkInLate}
                        checkOut={info.checkOut}
                        features={info.features}
                        minGuests={info.minGuests}
                        maxGuests={info.maxGuests}
                        size={info.size}
                        weekdayPrice={info.weekdayPrice}
                        weekendPrice={info.weekendPrice}
                    />
                )}
                {isLightboxOpen && (
                    <Lightbox
                        toggleLightbox={this.toggleLightbox}
                        imageUrls={imageUrls}
                    />
                )}
                <div
                    className={css.container}
                    style={{
                        ...((isModalOpen || isLightboxOpen)
                            ? { maxHeight: '100vh', overflow: 'hidden' }
                            : {}
                        ),
                    }}
                >
                    <Sidebar
                        toggleModal={this.toggleModal}
                        toggleLightbox={this.toggleLightbox}
                        imageUrls={imageUrls}
                        totalAmount={totalAmount}
                        nights={nights}
                    />
                    <RoomStatus
                        updateRange={this.updateRange}
                        startTime={startDate}
                        endTime={endDate}
                        roomName={roomName}
                        bathrooms={info.bathrooms}
                        beds={info.beds}
                        checkInEarly={info.checkInEarly}
                        checkInLate={info.checkInLate}
                        checkOut={info.checkOut}
                        details={info.details}
                        features={info.features}
                        minGuests={info.minGuests}
                        maxGuests={info.maxGuests}
                        size={info.size}
                        weekdayPrice={info.weekdayPrice}
                        weekendPrice={info.weekendPrice}
                    />
                </div>
            </React.Fragment>
        );
    }
}

RoomInfo.propTypes = {
    location: PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.shape({
            roomId: PropTypes.string,
            roomName: PropTypes.string,
        }),
    }).isRequired,
};

export default RoomInfo;
