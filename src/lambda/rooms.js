const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    /* eslint-disable no-console */
    const startTime = new global.Date().valueOf();
    const { httpMethod, path } = event;

    if (httpMethod !== 'GET') {
        const errMsg = `${httpMethod} method is not supported.`;

        console.log(`${httpMethod} ${path}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status 405 in ${endTime - startTime} ms.\n`);

        return {
            statusCode: 405,
            body: JSON.stringify({ error: errMsg }),
        };
    }

    try {
        console.log(`${httpMethod} ${path}`);
        const resp = await axios.get(`${API_URL}/rooms`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: API_KEY,
            },
        });
        const rooms = resp.data.items.map((room) => {
            const urlParts = room.imageUrl.split('&');
            urlParts.push('h=275');
            const newUrl = urlParts.map((part) => (part.startsWith('w=') ? 'w=275' : part));
            return {
                id: room.id,
                name: room.name,
                imageUrl: newUrl.join('&'),
                path: `/room/${room.name.toLowerCase().replace(/ /g, '-').replace('-room', '')}`,
            };
        });

        const endTime = new global.Date().valueOf();
        console.log(`Response with status 200 in ${endTime - startTime} ms.\n`);

        return {
            statusCode: 200,
            body: JSON.stringify(rooms),
        };
    } catch (err) {
        const { status, statusText, data: { message } } = err.response;
        const errMsg = `${status} ${statusText} - ${message}`;

        console.log(`[ERROR] ${errMsg}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status ${status} in ${endTime - startTime} ms.\n`);

        return {
            statusCode: status,
            body: JSON.stringify({ error: errMsg }),
        };
    }
    /* eslint-enable no-console */
};
