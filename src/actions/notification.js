import {ADD_NOTIFICATION, CLEAR_NOTIFICATION} from './types';

export const addNotification = ({ type = "success", message }) => ({
    type: ADD_NOTIFICATION,
    payload: {
        type,
        message,
    }
})

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
})