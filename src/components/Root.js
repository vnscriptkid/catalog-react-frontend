import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

export default (props) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers, 
        props.initialState, 
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}