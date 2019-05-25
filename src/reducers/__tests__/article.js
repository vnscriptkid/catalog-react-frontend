import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, REMOVE_ARTICLE} from '../../actions/types';
import reducer from '../article';

describe('article reducer', () => {
    let currentState = {
        1: { name: 'first article', id: 1 }
    }
    const article = { name: 'another article', id: 2 };
    const duplicateArticle = { name: 'duplicate', id: 1 }

    test('should handle default case', () => {
        const action = undefined;
        const newState = reducer(currentState, action)
        expect(newState).toEqual(currentState);
        expect(newState).toMatchObject(currentState);
    })

    test('should handle Save Articles case', () => {
        const action = { type: SAVE_ARTICLES, payload: [article] }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(2);
        expect(Object.keys(newState)).toMatchObject(["1", "2"]);
        expect(newState[2]).toMatchObject(article);
    })

    test('should handle save single article case', () => {
        const action = { type: SAVE_SINGLE_ARTICLE, payload: article }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(2);
        expect(Object.keys(newState)).toMatchObject(["1", "2"]);
        expect(newState[2]).toMatchObject(article);
    })

    test('should handle saving single duplicate article to take the new one', () => {
        const action = { type: SAVE_SINGLE_ARTICLE, payload: duplicateArticle }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(1);
        expect(Object.keys(newState)).toMatchObject(["1"]);
        expect(newState[1]).toMatchObject(duplicateArticle);
    })

    test('should handle saving list of articles with duplicate id', () => {
        const action = { type: SAVE_ARTICLES, payload: [duplicateArticle] }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(1);
        expect(Object.keys(newState)).toMatchObject(["1"]);
        expect(newState[1]).toMatchObject(duplicateArticle);
    })

    test('should handle remove article case with valid id', () => {
        const action = { type: REMOVE_ARTICLE, payload: "1" }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(0);
        expect(newState).toMatchObject({});
    })

    test('should not remove article if invalid id is provided', () => {
        const action = { type: REMOVE_ARTICLE, payload: "100" }
        const newState = reducer(currentState, action);
        expect(Object.keys(newState).length).toEqual(1);
        expect(newState[1]).toMatchObject({ name: 'first article', id: 1 });
    })
})