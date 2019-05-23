import api from '../api/instance';
import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, SAVE_LATEST_ARTICLES, REMOVE_ARTICLE} from './types';

// 2 cases
// /articles -> fetch the latest
// /categories/categoryId/articles -> fetch article of one category

export const fetchArticles = () => {
    return (dispatch) => {
        return api.get('articles').then(response => {
            dispatch(saveLatestArticles(response.data));
            dispatch(saveArticles(response.data))
        })
    }
}

export const fetchArticlesFromCategory = (categoryId) => {
    return (dispatch) => {
        return api.get(`categories/${categoryId}/articles`).then(response => {
            dispatch(saveArticles(response.data))
        })
    }
}

// TODO: reuse code fetch articles for get single one
export const fetchSingleArticle = (id) => {
    return (dispatch) => {
        return api.get(`articles/${id}`).then(response => {
            dispatch(saveSingleArticle(response.data));
        })
    }
}

export const saveLatestArticles = (articles) => ({
    type: SAVE_LATEST_ARTICLES,
    payload: articles
})

export const saveArticles = (articles) => ({
    type: SAVE_ARTICLES,
    payload: articles
})

export const saveSingleArticle = (article) => ({
    type: SAVE_SINGLE_ARTICLE,
    payload: article
})

export const deleteArticle = ({articleId, followingFn}) => {
    return (dispatch, getState) => {
        api.delete(`articles/${articleId}`, {
            headers: {
                'Authorization': `JWT ${getState().auth.token}`
            }
        })
        .then(() => {
            dispatch(removeArticle(articleId))
        })
        .catch(error => console.log('Can not delete article', error))
    }
}

export const removeArticle = (articleId) => ({
    type: REMOVE_ARTICLE,
    payload: articleId
})