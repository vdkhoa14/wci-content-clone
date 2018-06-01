import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import Main from './components/main'
import appReducer from './app/reducer'
import thunk from 'redux-thunk'
import { userIsLogoutRedir, userIsLoginRedir, partnerIsLogoutRedir, partnerIsLoginRedir } from './app/auth'
import { Route, Switch } from 'react-router'
import NotFound from './components/notfound'
import Login from './components/login'
const history = createHistory()
const middleware = routerMiddleware(history, thunk)

const store = createStore(
    combineReducers({
        ...appReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={userIsLogoutRedir(Main)} />
                <Route exact path="/*" component={userIsLoginRedir(Login)} />
                <Route component={NotFound} />
            </Switch>
            {/* <Main /> */}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)