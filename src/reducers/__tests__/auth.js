import {SAVE_USER_INFO, REMOVE_USER_INFO} from '../../actions/types';
import reducer, { getUserInfoFromStorage, setUserInfoToStorage, removeUserInfoFromStorage } from '../auth';

describe('auth reducer', () => {

    const userInfo = { token: '123', usename: 'mosalah' }

    test('should handle default case', () => {
        const action = undefined;
        const newState = reducer(undefined, action);
        expect(typeof newState).toEqual('object');
        expect(Object.keys(newState).length).toEqual(2);
        expect(newState).toMatchObject({ token: null, username: null });
    })
    
    test('should handle save user info action', () => {
        const action = { type: SAVE_USER_INFO, payload: userInfo };
        const state = { token: 'old', username: 'oldperson' };
        const newState = reducer(state, action);
        expect(typeof newState).toEqual('object');
        expect(Object.keys(newState).length).toEqual(2);
        expect(newState).toMatchObject(userInfo);
    })

    test('should handle remove user info action', () => {
        const action = { type: REMOVE_USER_INFO }
        const newState = reducer(userInfo, action);
        expect(typeof newState).toEqual('object');
        expect(Object.keys(newState).length).toEqual(2);
        expect(newState).toMatchObject({ token: null, username: null });
    })
})

describe('unit test localStorage', () => {
    let getSpy, setSpy;

    beforeEach(() => {
        getSpy = jest.spyOn(Storage.prototype, 'getItem')
        setSpy = jest.spyOn(Storage.prototype, 'setItem')
    })

    afterEach(() => {
        localStorage.getItem.mockRestore()
        localStorage.setItem.mockRestore()
    })

    test('get from local storage', () => {
        const userInfo = getUserInfoFromStorage()
        expect(getSpy).toHaveBeenCalledTimes(2)
        expect(getSpy).toHaveBeenNthCalledWith(1, 'token');
        expect(getSpy).toHaveBeenNthCalledWith(2, 'username');
        expect(userInfo).toMatchObject({ token: null, username: null });
    })

    test('set user info to localStorage', () => {
        setUserInfoToStorage({ token: '123', username: 'firmino' })
        expect(setSpy).toHaveBeenCalledTimes(2)
        expect(setSpy).toHaveBeenNthCalledWith(1, 'token', '123');
        expect(setSpy).toHaveBeenNthCalledWith(2, 'username', 'firmino');
        expect(localStorage.getItem('token')).toEqual('123');
        expect(localStorage.getItem('username')).toEqual('firmino');
    })

    test('remove user from localStorage', () => {
        setUserInfoToStorage({ token: '123', username: 'firmino' })
        removeUserInfoFromStorage();
        const result = getUserInfoFromStorage();
        expect(result).toMatchObject({ token: null, username: null });
    })
})