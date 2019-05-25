import {saveArticles, saveSingleArticle, removeArticle, fetchArticles, fetchSingleArticle, fetchArticlesFromCategory, deleteArticle, createArticle, updateArticle} from '../article';
import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, REMOVE_ARTICLE} from '../types';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api from '../../api/instance';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Sync test
describe('saveArticles action creator', () => {
    test('should produce an object with correct type and payload', () => {
        const articles = [{ title: 'jo jo', body: 'hey hey', category: { id: 1, name: 'fun' } }]
        const action = saveArticles(articles);
        expect(Object.keys(action).length).toEqual(2);
        expect(action.type).toEqual(SAVE_ARTICLES);
        expect(action.payload).toMatchObject(articles);
    })
})

describe('saveSingleArticle action creator', () => {
    test('should produce an object with correct type and payload', () => {
        const article = { title: 'how to', body: 'do it' }
        const action = saveSingleArticle(article);
        expect(action).toHaveProperty('type', SAVE_SINGLE_ARTICLE)
        expect(action.payload).toMatchObject(article);
        expect(Object.keys(action).length).toEqual(2);
    })
})

describe('removeArticle action creator', () => {
    test('should produce an object with correct type and payload', () => {
        const action = removeArticle(100);
        expect(action).toHaveProperty('type', REMOVE_ARTICLE);
        expect(action).toHaveProperty('payload', 100);
        expect(Object.keys(action).length).toEqual(2);
    })
})

// Async test

describe('articles async action', () => {
    beforeEach(() => moxios.install(api))
    afterEach(() => moxios.uninstall())

    test('should dispatch saveArticles after success fetching articles', (done) => {
        const articles = [{ title: 'jo jo', body: 'hey hey', category: { id: 1, name: 'fun' } }]
        moxios.stubRequest('http://localhost:5000/articles', {
            status: 200,
            response: articles
        })
        const store = mockStore({})
        store.dispatch(fetchArticles())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(saveArticles(articles)); 
                done()
            })
    })

    test('should dispatch saveSingleArticle after success fetching single article', (done) => {
        const article = { title: 'jo jo', body: 'hey hey'}
        moxios.stubRequest('http://localhost:5000/articles/1', {
            status: 200,
            response: article
        })
        const store = mockStore({})
        store.dispatch(fetchSingleArticle({ id: 1 }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(saveSingleArticle(article)); 
                done()
            })
    })

    test('should dispatch saveArticles after success fetching articles from category', (done) => {
        const articles = [{ title: 'jo jo', body: 'hey hey', category: { id: 1, name: 'fun' } }]
        moxios.stubRequest('http://localhost:5000/categories/2/articles', {
            status: 200,
            response: articles
        })
        const store = mockStore({})
        store.dispatch(fetchArticlesFromCategory(2))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(saveArticles(articles)); 
                done()
            })
    })

    test('should dispatch removeArticle after success deleting an article', (done) => {
        moxios.stubRequest('http://localhost:5000/articles/1', {
            status: 200
        })
        const store = mockStore({ 
            articles: { 1: { title: 'one', body: 'one' } },
            auth: { token: '123' }
        })
        store.dispatch(deleteArticle({ articleId: 1 }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(removeArticle(1));
                done()
            })
    })

    test('should dispatch saveSingleArticle after successfully creating an article', (done) => {
        const article ={ id: 1, title: 'one', body: 'one' }
        moxios.stubRequest('http://localhost:5000/articles', {
            status: 200,
            response: article
        })
        const store = mockStore({ 
            auth: { token: '123' }
        })
        store.dispatch(createArticle(article))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(saveSingleArticle(article));
                done()
            })
    })

    test('should dispatch saveSingleArticle after successfully updating an article', (done) => {
        const article ={ title: 'one', body: 'one', category: 2 }
        moxios.stubRequest('http://localhost:5000/articles/1', {
            status: 200,
            response: article
        })
        const store = mockStore({ 
            auth: { token: '123' }
        })
        store.dispatch(updateArticle({ articleId: 1, updatedArticle: article, afterFailure: () => {} }))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toMatchObject(saveSingleArticle(article));
                done()
            })
    })
})
