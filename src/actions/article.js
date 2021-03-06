import api, {authHeader} from '../api/instance';
import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, REMOVE_ARTICLE} from './types';
import _ from 'lodash';

export const fetchArticles = () => {
    return (dispatch) => {
        return api.get('articles').then(response => {
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
export const fetchSingleArticle = ({ id, followSuccess, followFailure }) => {
    return (dispatch) => {
        return api.get(`articles/${id}`)
        .then(response => {
            dispatch(saveSingleArticle(response.data));
            if (followSuccess) followSuccess();
        })
        .catch(error => {
            debugger;
            console.log(error);
            if (followFailure) followFailure();
        })
    }
}

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
        return api.delete(`articles/${articleId}`, {
            headers: {
                'Authorization': `JWT ${getState().auth.token}`
            }
        })
        .then(() => {
            dispatch(removeArticle(articleId))
            followingFn()
        })
        .catch(error => console.log('Can not delete article', error.response))
    }
}

export const removeArticle = (articleId) => ({
    type: REMOVE_ARTICLE,
    payload: articleId
})

export const updateArticle = ({ articleId, updatedArticle, afterSuccess, afterFailure }) => {
    return (dispatch, getState) => {
        return api.put(`articles/${articleId}`, null, {
            data: _.pick(updatedArticle, ['title', 'body', 'category_id']),
            headers: authHeader(getState().auth.token) 
        })
        .then(response => {
            dispatch(saveSingleArticle(response.data));
            afterSuccess()
        })
        .catch(error => {
            afterFailure(error.response);
        })
    }
}

export const createArticle = ({ article, afterSuccess, afterFailure }) => {
    return (dispatch, getState) => {
        return api.post(`articles`, null, {
            data: _.pick(article, ['title', 'body', 'category_id']),
            headers: authHeader(getState().auth.token) 
        })
        .then(response => {
            const article = response.data;
            dispatch(saveSingleArticle(article))
            if (afterSuccess && typeof afterSuccess === 'function') afterSuccess(article);
        })
        .catch(error => {
            if (afterFailure && typeof afterFailure === 'function') afterFailure(error.response);
        })
    }
} 