import React from 'react';

const emoticon = '( • ̀ω•́ )';
const styles = {
    div: {
        margin: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(40, 40, 40)',
    },
    h1: {
        userSelect: 'none',
        margin: 0,
        fontFamily: 'Arial',
        fontSize: '50px',
        color: 'rgb(240, 240, 240)',
    },
};

class PageNotFound extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div style={styles.div}>
                <h1 style={styles.h1}>{emoticon}</h1>
            </div>
        );
    }
}

export default PageNotFound;
