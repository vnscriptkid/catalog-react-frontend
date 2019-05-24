import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, REMOVE_ARTICLE} from '../actions/types'

export default (state = {}, action = {}) => {
    switch (action.type) {
        case SAVE_ARTICLES:
            const transformedArticles = action.payload.reduce((acc, article) => {
                acc[article.id] = article;
                return acc;
            }, {})
            return { ...state, ...transformedArticles }
        case SAVE_SINGLE_ARTICLE:
            const article = action.payload
            return { ...state, [article.id]: article }
        case REMOVE_ARTICLE:
            const articlesObject = Object.keys(state)
                .filter(articleId => articleId !== action.payload)
                .reduce((acc, articleId) => {
                    acc[articleId] = state[articleId];
                    return acc;
                }, {})
            return articlesObject;
        default:
            return state;
    }
}