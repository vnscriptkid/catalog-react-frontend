import { REMOVE_TOKEN, SAVE_USER_INFO} from '../actions/types';

function getUserInfoFromStorage() {
    const token = localStorage.getItem('token') || null;
    const username = localStorage.getItem('username') || null;
    return { username, token }
}

function setUserInfoToStorage({ token, username }) {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
}

function removeUserInfoFromStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

const defaultState = getUserInfoFromStorage()

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            setUserInfoToStorage(action.payload);
            return action.payload;
        case REMOVE_TOKEN:
            removeUserInfoFromStorage();
            return { token: null, username: null };
        default:
            return state;
    }
}