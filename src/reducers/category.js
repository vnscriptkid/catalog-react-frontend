import {SAVE_CATEGORIES} from '../actions/types';

export default (state = [], action = {}) => {

    debugger; 
    switch (action.type) {
        case SAVE_CATEGORIES:
            return [...action.payload];
        default:
            return state;
    }
}