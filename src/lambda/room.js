const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    /* eslint-disable no-console */
    const startTime = new global.Date().valueOf();
    const { httpMethod, queryStringParameters, path } = event;

    if (httpMethod !== 'GET') {
        const errMsg = `${httpMethod} method is not supported.`;

        console.log(`${httpMethod} ${path}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status 405 in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: 405,
            body: JSON.stringify({ error: errMsg }),
        };
    }

    if (!queryStringParameters.id) {
        const errMsg = 'An ID must be provided.';

        console.log(`${httpMethod} ${path}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status 400 in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: 400,
            body: JSON.stringify({ error: errMsg }),
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
            return urlParts
                .filter((part) => (!part.startsWith('w=') && !part.startsWith('h=')))
                .join('&');
        });
        return { imageUrls, info, reservations: booking };
    };

    const { id } = queryStringParameters;
    try {
        console.log(`${httpMethod} ${path}?id=${id}`);

        const resp = await axios.get(`${API_URL}/room/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: API_KEY,
            },
        });
        const data = cleanUpResp(resp.data);

        const endTime = new global.Date().valueOf();
        console.log(`Response with status 200 in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        const { status, statusText, data: { message } } = err.response;
        const errMsg = `${status} ${statusText} - ${message}`;

        console.log(`[ERROR] ${errMsg}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status ${status} in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: status,
            body: JSON.stringify({ error: errMsg }),
        };
    }
    /* eslint-enable no-console */
};
