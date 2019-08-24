const proxy = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function(app) {
    app.use(proxy('/.netlify/functions/', {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/functions': '' },
    }));
};
