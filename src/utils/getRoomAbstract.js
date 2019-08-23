const getRoomAbstract = (obj = {}) => {
    const {
        bathrooms,
        beds,
        features,
        minGuests,
        maxGuests,
        size,
    } = obj;
    const hasMealOrNot = features.Breakfast ? '附早餐' : '';
    const guestRange = (minGuests === maxGuests)
        ? maxGuests.toString()
        : `${minGuests}~${maxGuests}`;
    return `${guestRange}人・${beds}張床・${hasMealOrNot}・衛浴${bathrooms}間・${size}平方公尺`;
};

export default getRoomAbstract;
