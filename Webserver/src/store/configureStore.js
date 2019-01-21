import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// Store creation
// combineReducers expects an object, the root object and the reducer that manages it

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({ 
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

