const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    const { httpMethod } = event;
    if (httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: `${httpMethod} method is not supported.` }),
        };
    }
    try {
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
        return {
            statusCode: 200,
            body: JSON.stringify(rooms),
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
