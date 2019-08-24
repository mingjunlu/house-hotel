const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    const { httpMethod, queryStringParameters } = event;
    if (httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: `${httpMethod} method is not supported.` }),
        };
    }
    if (!queryStringParameters.id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'An ID must be provided.' }),
        };
    }
    const cleanUpResp = (obj) => {
        const { room, booking } = obj;
        const info = {
            type: room[0].name,
            details: room[0].description.split('. ').map((sentence) => sentence.replace(/\./g, '')),
            weekdayPrice: room[0].normalDayPrice,
            weekendPrice: room[0].holidayPrice,
            checkInEarly: room[0].checkInAndOut.checkInEarly,
            checkInLate: room[0].checkInAndOut.checkInLate,
            checkOut: room[0].checkInAndOut.checkOut,
            minGuests: room[0].descriptionShort.GuestMin,
            maxGuests: room[0].descriptionShort.GuestMax,
            beds: room[0].descriptionShort.Bed.length,
            bathrooms: room[0].descriptionShort['Private-Bath'],
            size: room[0].descriptionShort.Footage,
            features: room[0].amenities,
        };
        const imageUrls = room[0].imageUrl.map((url) => {
            const urlParts = url.split('&');
            urlParts.push('h=1068');
            return urlParts.map((part) => (part.startsWith('w=') ? 'w=573' : part)).join('&');
        });
        return { imageUrls, info, reservations: booking };
    };

    const { id } = queryStringParameters;
    try {
        const resp = await axios.get(`${API_URL}/room/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: API_KEY,
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(cleanUpResp(resp.data)),
        };
    } catch (err) {
        const { status, statusText, data: { message } } = err.response;
        const errMsg = { error: `${status} ${statusText} - ${message}` };
        return {
            statusCode: status,
            body: JSON.stringify(errMsg),
        };
    }
};
