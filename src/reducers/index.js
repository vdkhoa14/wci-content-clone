import {
    INIT_PAGE,
    UPDATE_COMPONENT
} from '../constants/actionTypes'

const initialState = []
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INIT_PAGE:
            var newState = action.payload
            return newState
        default:
            return state
    }
}