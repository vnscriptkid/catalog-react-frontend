import {ADD_NOTIFICATION, CLEAR_NOTIFICATION} from '../actions/types';

const defaultState = {
    message: "",
    type: "",
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return action.payload;
        case CLEAR_NOTIFICATION:
            return defaultState;
        default:
            return state;
    }
}