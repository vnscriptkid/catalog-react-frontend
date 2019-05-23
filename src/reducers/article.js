import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, SAVE_LATEST_ARTICLES, REMOVE_ARTICLE} from '../actions/types'

const defaultState = {
    all: {},
    latest: [],
}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case SAVE_LATEST_ARTICLES:
            return {  ...state, latest: action.payload.map(article => article.id) }
        case SAVE_ARTICLES:
            const transformedArticles = action.payload.reduce((acc, article) => {
                acc[article.id] = article;
                return acc;
            }, {})
            return { ...state, all: { ...state.all, ...transformedArticles} }
        case SAVE_SINGLE_ARTICLE:
            const article = action.payload
            return { ...state, all: {...state.all, [article.id]: article} }
        case REMOVE_ARTICLE:
            return state;
        default:
            return state;
    }
}