import {SELECT_CATEGORY} from '../actions/types'

export default (state = null, action = {}) => {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.payload;
        default:
            return state;
    }
}