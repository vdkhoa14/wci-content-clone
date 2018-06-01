import { combineReducers } from 'redux';
import dashboard from '../components/dashboard/reducer'
import auth from '../components/login/reducer'
export default combineReducers({
    dashboard,
    auth
})