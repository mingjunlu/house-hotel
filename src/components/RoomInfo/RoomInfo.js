import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../../styles/datePicker.css';
import css from '../../styles/RoomInfo/RoomInfo.module.css';
import BookingModal from '../BookingModal/BookingModal';
import Mockup from './Mockup';
import Sidebar from './Sidebar';
import RoomStatus from './RoomStatus';

const apiUrl = process.env.REACT_APP_API_URL;
const startOfToday = dayjs().startOf('day');

class RoomInfo extends React.Component {
    state = {
        startDate: startOfToday.valueOf(),
        endDate: startOfToday.add(1, 'day').valueOf(),
        isModalOpen: false,
        isLoading: true,
        hasError: false,
        info: {},
        reservations: [],
    }

    async componentDidMount() {
        const { location: { state: locationState } } = this.props;
        if (locationState) {
            const { roomId } = locationState;
            try {
                const json = await fetch(`${apiUrl}/room/${roomId}`);
                const { info, reservations } = await json.json();
                this.setState({ isLoading: false, info, reservations });
            } catch (err) {
                this.setState({ isLoading: false, hasError: true });
            }
        }
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
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
        const {
            roomName,
            imageUrl,
            weekdayPrice,
            weekendPrice,
        } = locationState;
        const {
            startDate,
            endDate,
            isModalOpen,
            isLoading,
            hasError,
            info,
            reservations,
        } = this.state;
        if (isLoading) { return <Mockup roomName={roomName} imageUrl={imageUrl} />; }
        const hasDifferentStartDate = !dayjs(startDate).isSame(dayjs(), 'day');
        const hasDifferentEndDate = !dayjs(endDate).isSame(dayjs().add(1, 'day'));
        const hasDifferentRange = (hasDifferentStartDate || hasDifferentEndDate);
        return (
            <React.Fragment>
                {isModalOpen && (
                    <BookingModal
                        toggleModal={this.toggleModal}
                        startTime={hasDifferentRange && startDate}
                        endTime={hasDifferentRange && endDate}
                    />
                )}
                <div
                    className={css.container}
                    style={{ ...(isModalOpen ? { maxHeight: '100vh', overflow: 'hidden' } : {}) }}
                >
                    <Sidebar toggleModal={this.toggleModal} imageUrl={imageUrl} />
                    <RoomStatus
                        roomName={roomName}
                        weekdayPrice={weekdayPrice}
                        weekendPrice={weekendPrice}
                        startTime={startDate}
                        endTime={endDate}
                        updateRange={this.updateRange}
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
            imageUrl: PropTypes.string,
            roomId: PropTypes.string,
            roomName: PropTypes.string,
            weekdayPrice: PropTypes.number,
            weekendPrice: PropTypes.number,
        }),
    }).isRequired,
};

export default RoomInfo;
