import api from '../api/instance';
import { REMOVE_USER_INFO, SAVE_USER_INFO} from './types';

// TODO: handle error case
export const login = ({username, password, followSuccess, followFailure}) => {
    return (dispatch) => {
        return api.post('/auth', { username, password })
            .then(response => {
                dispatch(saveUserInfo({token: response.data.access_token, username}))
                if (followSuccess) followSuccess();
            })
            .catch(error => {
                if (followFailure) followFailure(error.response)
            })

    }
}

export const registerUser = ({ username, password, firstName, lastName, afterSuccess, afterFailure }) => {
    return (dispatch, getState) => {
        return api.post('/users', null, {
            data: { username, password, first_name: firstName, last_name: lastName }
        })
            .then((response) => {
                if (afterSuccess && typeof afterSuccess === 'function') afterSuccess();
            })
            .catch((error) => {
                if (afterFailure && typeof afterFailure === 'function') afterFailure();
            })
    }
}

export const logout = () => ({
    type: REMOVE_USER_INFO
})

export const saveUserInfo = ({ token, username }) => ({
    type: SAVE_USER_INFO,
    payload: {
        token,
        username
    }
})