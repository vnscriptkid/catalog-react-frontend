import {SAVE_CATEGORIES} from '../../actions/types';
import reducer from '../category';

describe('category reducer', () => {
    test('should handle the default case', () => {
        const currentState = [{ name: 'shopping' }];
        const action = undefined;
        const newState = reducer(currentState, action)
        expect(newState).toMatchObject(currentState);
    })

    test('should handle save categories action', () => {
        const currentState = [];
        const action = { type: SAVE_CATEGORIES, payload: [{ name: 'gym' }, { name: 'football' }] }
        const newState = reducer(currentState, action);
        expect(Array.isArray(newState)).toEqual(true);
        expect(newState.length).toEqual(2);
        expect(newState[0]).toHaveProperty('name', 'gym');
        expect(newState[1]).toHaveProperty('name', 'football');
    })
})