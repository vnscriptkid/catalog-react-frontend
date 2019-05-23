import api from '../api/instance';
import {SAVE_TOKEN, REMOVE_TOKEN} from './types';

// TODO: handle error case
export const login = ({username, password, followFn}) => {
    return (dispatch) => {
        api.post('/auth', { username, password })
            .then(response => {
                dispatch(saveToken(response.data.access_token))
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