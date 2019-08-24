const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    const { httpMethod, queryStringParameters, body } = event;
    if (httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: `${httpMethod} method is not supported.` }),
        };
    }
    if (!queryStringParameters.room || !body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Further information needed.' }),
        };
    }
    const { room } = queryStringParameters;
    try {
        const resp = await axios.post(`${API_URL}/room/${room}`, body, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: API_KEY,
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(resp.data),
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
