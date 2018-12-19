import React from 'react';
import { HashRouter as Router,BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './pages/404';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact render={() => <Redirect to="/app/data-monitor" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)