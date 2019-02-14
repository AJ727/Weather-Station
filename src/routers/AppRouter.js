import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import TempChart from '../components/TempChart';
import HumidChart from '../components/HumidChart';
import PressChart from '../components/PressChart';
import WindSpdChart from '../components/WindSpdChart';
import WindDirChart from '../components/WindDirChart';
import NotFoundPage from '../components/NotFoundPage';

// Stateless functional React Component
// path = where we want to show something
// component = what we want to render, when we match the route
// exact = because it doesn't look for exact matches inherently, it will serve up anything with "/"
// <Switch> --> traverses from top to bottom and stops when the correct path is found. If none is found it'll display
// the last one which is the 404 page
// :id dynamically matches whatever comes after /edit/ such as /edit/44
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
        <Switch>
            <Route path="/" component={DashboardPage} exact={true} />
            <Route path="/temp" component={TempChart} />
            <Route path="/humidity" component={HumidChart} />
            <Route path="/pressure" component={PressChart} />
            <Route path="/wind_speed" component={WindSpdChart} />
            <Route path="/wind_dir" component={WindDirChart} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </Router>
)

export default AppRouter;
