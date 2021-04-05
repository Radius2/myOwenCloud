import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import owenCloud from './Reducers/dataFromOwencloud';
import selectedParameters from './Reducers/selectedParameters';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    selectedParameters,
    owenCloud
})

 const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

export default store;