import {SAVE_USER_INFO, REMOVE_USER_INFO} from '../types';
import { saveUserInfo, logout, login, registerUser } from '../auth';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import api from '../../api/instance';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync test auth', () => {
    test('saveUserInfo action creator should produce an object with correct type and payload', () => {
        const userInfo = { token: '123', username: 'hendo14' };
        const action = saveUserInfo(userInfo);
        expect(action).toHaveProperty('type', SAVE_USER_INFO);
        expect(action.payload).toMatchObject(userInfo);
        expect(Object.keys(action).length).toEqual(2);
    })

    test('logout action creator should produce an object with correct type and payload', () => {
        const action = logout();
        expect(action).toHaveProperty('type', REMOVE_USER_INFO);
        expect(Object.keys(action).length).toEqual(1);
    })
})

describe('async test auth', () => {
    beforeEach(() => moxios.install(api))
    afterEach(() => moxios.uninstall())

    test('login action should dispatch saveUserInfo in case successfully log in', done => {
        const user = { username: 'vnscriptkid', password: '123456' }
        moxios.stubRequest('http://localhost:5000/auth', {
            status: 200,
            response: { access_token: '123', username: user.username }
        })
        const store = mockStore({})
        store.dispatch(login({ ...user }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toMatchObject(saveUserInfo({ token: '123', username: user.username }))
                done();
            })
    })

    test('register action should trigger afterSuccess function in case of success', done => {
        const postData = { username: 'vnscriptkid', password: '123456', afterSuccess: jest.fn(), afterFailure: jest.fn() }
        moxios.stubRequest('http://localhost:5000/users', {
            status: 200,
            response: {}
        })
        const store = mockStore({})
        store.dispatch(registerUser({ ...postData }))
            .then(() => {
                expect(postData.afterSuccess).toHaveBeenCalled();
                expect(postData.afterFailure).not.toHaveBeenCalled();
                done();
            })
    })
})