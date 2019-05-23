import {SAVE_TOKEN, REMOVE_TOKEN} from '../actions/types';

const TOKEN = 'access_token';

function getTokenFromStorage() {
    return localStorage.getItem(TOKEN);
}

function setTokenFromStorage(token) {
    localStorage.setItem(TOKEN, token)
}

function removeTokenFromStorage() {
    localStorage.removeItem(TOKEN);
}

const defaultState = getTokenFromStorage() || null;

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case SAVE_TOKEN: 
            setTokenFromStorage(action.payload);
            return action.payload;
        case REMOVE_TOKEN:
            removeTokenFromStorage();
            return null;
        default:
            return state;
    }
}