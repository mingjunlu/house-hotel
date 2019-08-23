import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import RoomInfo from './RoomInfo/RoomInfo';
import PageNotFound from './PageNotFound';

const apiUrl = process.env.REACT_APP_API_URL;

class App extends React.Component {
    state = {
        hasError: false,
        rooms: [],
    }

    async componentDidMount() {
        try {
            const resp = await fetch(`${apiUrl}/rooms`);
            const rooms = await resp.json();
            this.setState({ rooms });
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
