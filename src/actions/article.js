import api from '../api/instance';
import {SAVE_ARTICLES, SAVE_SINGLE_ARTICLE, REMOVE_ARTICLE} from './types';

// 2 cases
// /articles -> fetch the latest
// /categories/categoryId/articles -> fetch article of one category

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
        api.delete(`articles/${articleId}`, {
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

export const editArticle = ({ articleId, updatedArticle }) => {
    return (dispatch, getState) => {
        api.put(`articles/${articleId}`, {
            data: updatedArticle,
            headers: {
                'Authorization': `JWT ${getState().auth.token}`
            }
        })
    }
}