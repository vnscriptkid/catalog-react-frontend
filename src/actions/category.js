import api from '../api/instance';
import {SAVE_CATEGORIES, SELECT_CATEGORY} from './types';

export const fetchCategories = () => {
    return (dispatch) => {
        return api.get('/categories').then(response => {
            dispatch(saveCategories(response.data));
        })
    }
}

export const saveCategories = (categories) => ({
    type: SAVE_CATEGORIES,
    payload: categories
})

export const selectCategory = (categoryName) => ({
    type: SELECT_CATEGORY,
    payload: categoryName
})