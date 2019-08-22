import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import 'normalize.css/normalize.css';
import './styles/reset.min.css';
import './styles/index.css';
import App from './components/App';

WebFont.load({
    google: {
        families: [
            'Open Sans:300,400,600,700',
            'Noto Sans TC:100,400',
        ],
    },
});

ReactDOM.render(<App />, document.getElementById('root'));
