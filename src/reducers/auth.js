import {SAVE_TOKEN, REMOVE_TOKEN} from '../actions/types';

export default (state = null, action = {}) => {
    switch (action.type) {
        case SAVE_TOKEN: 
            return action.payload;
        case REMOVE_TOKEN:
            return null;
        default:
            return state;
    }
}