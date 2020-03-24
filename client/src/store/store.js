import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { userReducer } from './user';
import { chatReducer } from './chat';

const logger = createLogger();
const reducer = combineReducers({
    user: userReducer,
    chat: chatReducer
})

export default createStore(reducer, applyMiddleware(logger));