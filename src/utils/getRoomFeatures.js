import breakfastIcon from '../assets/icons/breakfast.svg';
import miniBarIcon from '../assets/icons/mini-bar.svg';
import roomServiceIcon from '../assets/icons/room-service.svg';
import wifiIcon from '../assets/icons/wifi.svg';
import playgroundIcon from '../assets/icons/playground.svg';
import phoneIcon from '../assets/icons/phone.svg';
import viewIcon from '../assets/icons/view.svg';
import fridgeIcon from '../assets/icons/fridge.svg';
import sofaIcon from '../assets/icons/sofa.svg';
import petsIcon from '../assets/icons/pets.svg';
import noSmokingIcon from '../assets/icons/no-smoking.svg';
import airConditionerIcon from '../assets/icons/air-conditioner.svg';
import sampleData from './sample.json';

/* eslint-disable dot-notation */
const getRoomFeatures = (obj = sampleData.room[0].amenities) => {
    if (obj === false) {
        return [
            { path: breakfastIcon, exists: false },
            { path: miniBarIcon, exists: false },
            { path: roomServiceIcon, exists: false },
            { path: wifiIcon, exists: false },
            { path: playgroundIcon, exists: false },
            { path: phoneIcon, exists: false },
            { path: viewIcon, exists: false },
            { path: fridgeIcon, exists: false },
            { path: sofaIcon, exists: false },
            { path: petsIcon, exists: false },
            { path: noSmokingIcon, exists: false },
            { path: airConditionerIcon, exists: false },
        ];
    }
    return [
        { path: breakfastIcon, exists: !!obj['Breakfast'] },
        { path: miniBarIcon, exists: !!obj['Mini-Bar'] },
        { path: roomServiceIcon, exists: !!obj['Room-Service'] },
        { path: wifiIcon, exists: !!obj['Wi-Fi'] },
        { path: playgroundIcon, exists: !!obj['Child-Friendly'] },
        { path: phoneIcon, exists: !!obj['Television'] },
        { path: viewIcon, exists: !!obj['Great-View'] },
        { path: fridgeIcon, exists: !!obj['Refrigerator'] },
        { path: sofaIcon, exists: !!obj['Sofa'] },
        { path: petsIcon, exists: !!obj['Pet-Friendly'] },
        { path: noSmokingIcon, exists: !!obj['Smoke-Free'] },
        { path: airConditionerIcon, exists: !!obj['Air-Conditioner'] },
    ];
};
/* eslin-enable */

export default getRoomFeatures;
