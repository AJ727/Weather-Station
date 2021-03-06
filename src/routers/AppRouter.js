import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';

// Stateless functional React Component
// path = where we want to show something
// component = what we want to render, when we match the route
// exact = because it doesn't look for exact matches inherently, it will serve up anything with "/"
// <Switch> --> traverses from top to bottom and stops when the correct path is found. If none is found it'll display
// the last one which is the 404 page
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header /> 
                <Switch>
                    <Route path="/" component={DashboardPage} exact={true} />
                    <Route component={NotFoundPage} />
                </Switch>
        </div>
    </Router>
)

export default AppRouter;
