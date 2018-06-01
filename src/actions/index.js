import {
    INIT_PAGE,
    UPDATE_COMPONENT
} from '../constants/actionTypes'
import { get } from '../utils/networking'

export const initPage = () => {

    return dispatch => {
        dispatch({ type: "WAIT" })

        get("api/components/get", result => {
            return dispatch(initPageSuccess(result))
        })
    }
}
const initPageSuccess = (result) => {
    return {
        type: INIT_PAGE,
        payload: result
    }
}
export const updateComponent = (param) => {

    return {
        type: UPDATE_COMPONENT,
        payload: param
    }
}
