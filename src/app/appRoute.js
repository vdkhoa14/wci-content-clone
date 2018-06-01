import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from '../components/main'
import Login from '../components/login'
import UpdateBanner from '../components/banner/update'
import { staffIsAuthenticatedRedir } from './auth'

class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/*' component={staffIsAuthenticatedRedir(Main)} />
                </Switch>
            </Router>
        )
    }
}
export default AppRoute