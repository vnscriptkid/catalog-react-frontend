import {SAVE_CATEGORIES} from '../actions/types';

export default (state = [], action = {}) => {
    switch (action.type) {
        case SAVE_CATEGORIES:
            return [...action.payload];
        default:
            return state;
    }
}