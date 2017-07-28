import { applyMiddleware }  from 'redux'
import thunk from 'redux-thunk';
import KillSwitchMiddleware from './KillSwitchMiddleware';

export default middlewares = applyMiddleware(
    thunk,
    KillSwitchMiddleware
);
