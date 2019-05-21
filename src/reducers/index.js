import {combineReducers} from 'redux';
import authReducer from './auth'
import articleReducer from './article'
import categoryReducer from './category'

export default combineReducers({
    auth: authReducer,
    article: articleReducer,
    category: categoryReducer
})