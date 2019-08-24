import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage/HomePage';
import RoomInfo from './RoomInfo/RoomInfo';
import PageNotFound from './PageNotFound';

class App extends React.Component {
    state = {
        hasError: false,
        rooms: [],
    }

    async componentDidMount() {
        try {
            const resp = await axios.get('/.netlify/functions/rooms');
            this.setState({ rooms: resp.data });
        } catch (err) {
            this.setState({ hasError: true });
        }
    }

    renderHomePage = () => {
        const { rooms } = this.state;
        return <HomePage rooms={rooms} />;
    }

    render () {
        const { hasError } = this.state;
        if (hasError) { return <PageNotFound />; }
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={this.renderHomePage} />
                    <Route exact path="/room/:name" component={RoomInfo} />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
