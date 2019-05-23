import {combineReducers} from 'redux';
import authReducer from './auth'
import articleReducer from './article'
import categoryReducer from './category'
import { reducer as formReducer } from 'redux-form';
import selectedCategory from './selectedCategory';
import notificationReducer from './notification';

export default combineReducers({
    notification: notificationReducer,
    auth: authReducer,
    articles: articleReducer,
    categories: categoryReducer,
    form: formReducer,
    selectedCategory: selectedCategory
})