const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async (event) => {
    /* eslint-disable no-console */
    const startTime = new global.Date().valueOf();
    const {
        httpMethod,
        queryStringParameters,
        body,
        path,
    } = event;

    if (httpMethod !== 'POST') {
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

    if (!queryStringParameters.room || !body) {
        const errMsg = 'Further information needed.';

        console.log(`${httpMethod} ${path}`);
        const endTime = new global.Date().valueOf();
        console.log(`Response with status 400 in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: 400,
            body: JSON.stringify({ error: errMsg }),
        };
    }

    const { room } = queryStringParameters;
    try {
        console.log(`${httpMethod} ${path}?room=${room}`);
        const reqBody = JSON.parse(body);
        reqBody.tel = reqBody.tel
            .split('')
            .map((char, idx) => ((idx > 1 && idx < 7) ? '*' : char))
            .join('');
        console.log(JSON.stringify(reqBody));

        const resp = await axios.post(`${API_URL}/room/${room}`, body, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: API_KEY,
            },
        });

        const endTime = new global.Date().valueOf();
        console.log(`Response with status 200 in ${endTime - startTime} ms.`);
        console.log('--------------------');

        return {
            statusCode: 200,
            body: JSON.stringify(resp.data),
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
