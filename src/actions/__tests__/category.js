import moxios from 'moxios';
import {SAVE_CATEGORIES, SELECT_CATEGORY} from '../types';
import { saveCategories, fetchCategories, selectCategory } from '../category';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../../api/instance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync test category', () => {
    test('save categories action creator should produce object with correct type and payload', () => {
        const categories = [{ name: 'shopping' }];
        const action = saveCategories(categories);
        expect(action).toHaveProperty('type', SAVE_CATEGORIES);
        expect(action.payload).toMatchObject(categories);
    })

    test('select category action creator should produce object with correct type and payload', () => {
        const categoryName = "shopping"
        const action = selectCategory(categoryName);
        expect(action).toHaveProperty('type', SELECT_CATEGORY);
        expect(action.payload).toEqual(categoryName);
    })
})

describe('async test category', () => {
    beforeEach(() => moxios.install(api))
    afterEach(() => moxios.uninstall())

    test('fetch Categories should dispatch save categories after successfully fetching', done => {
        const categories = [{ name: 'shopping' }, { name: 'football' }];
        moxios.stubRequest('http://localhost:5000/categories', {
            status: 200,
            response: categories
        })
        const store = mockStore({});
        store.dispatch(fetchCategories())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toMatchObject(saveCategories(categories));
                done();
            })

    })
})