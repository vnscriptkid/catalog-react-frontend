import api from '../api/instance';
import { REMOVE_TOKEN, SAVE_USER_INFO} from './types';

// TODO: handle error case
export const login = ({username, password, followSuccess, followFailure}) => {
    return (dispatch) => {
        api.post('/auth', { username, password })
            .then(response => {
                dispatch(saveUserInfo({token: response.data.access_token, username}))
                followSuccess();
            })
            .catch(error => {
                followFailure(error.response.data.description)
            })

    }
}

export const logout = () => ({
    type: REMOVE_TOKEN
})

export const saveUserInfo = ({ token, username }) => ({
    type: SAVE_USER_INFO,
    payload: {
        token,
        username
    }
})