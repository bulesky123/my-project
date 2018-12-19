import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from '../pages/dashboard/Dashboard';


import DataMonitor from '../pages/data-monitor/';
import DataConfigure from '../pages/data-configure/';
import DataUnusual from '../pages/data-unusual';
import DataImitate from '../pages/data-imitate/';



import EventReport from '../pages/event-report/';
import EventUnusual from '../pages/event-unusual/';
export default class CRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />
                <Route exact path="/app/event/unusual" component={EventUnusual} />
                <Route exact path="/app/event/data-report" component={EventReport} />
                
                
                <Route exact path="/app/data-monitor" component={DataMonitor} />
                <Route exact path="/app/data/configure" component={DataConfigure} />
                <Route exact path="/app/data/data-unusual" component={DataUnusual} />
                <Route exact path="/app/data/imitate" component={DataImitate} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}
