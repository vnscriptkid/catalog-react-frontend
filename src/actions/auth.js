import api from '../api/instance';
import {SAVE_TOKEN, REMOVE_TOKEN, SAVE_USER_INFO} from './types';

// TODO: handle error case
export const login = ({username, password, followFn}) => {
    return (dispatch) => {
        api.post('/auth', { username, password })
            .then(response => {
                dispatch(saveUserInfo({token: response.data.access_token, username}))
                followFn();
            })
    }
}

export const logout = () => ({
    type: REMOVE_TOKEN
})

export const saveToken = (token) => ({
    type: SAVE_TOKEN,
    payload: token
})

export const saveUserInfo = ({ token, username }) => ({
    type: SAVE_USER_INFO,
    payload: {
        token,
        username
    }
})