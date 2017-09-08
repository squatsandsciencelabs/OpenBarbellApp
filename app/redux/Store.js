import { AsyncStorage } from 'react-native';
import {persistStore, autoRehydrate} from 'redux-persist'
import Reactotron from 'reactotron-react-native';

// store imports
import { compose, createStore, applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import Sagas from 'app/redux/sagas/Sagas';
import reducers from 'app/redux/reducers/Reducers';

// startup imports
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as KillSwitchActionCreators from 'app/redux/shared_actions/KillSwitchActionCreators';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as StoreActionCreators from 'app/redux/shared_actions/StoreActionCreators';

export default initializeStore = () => {
    // create the store
    if (__DEV__) {
        // reactotron development mode
        const sagaMonitor = Reactotron.createSagaMonitor();
        var sagaMiddleware = createSagaMiddleware({sagaMonitor});
        const middlewares = applyMiddleware(
            thunk,
            sagaMiddleware
        );
        const enhancers = compose(middlewares, autoRehydrate());        
        var store = Reactotron.createStore(reducers, enhancers);
    } else {
        // release mode
        var sagaMiddleware = createSagaMiddleware();
        const middlewares = applyMiddleware(
            thunk,
            sagaMiddleware
        );
        const enhancers = compose(middlewares, autoRehydrate());        
        var store = createStore(reducers, enhancers);
    }

    // run sagas
    sagaMiddleware.run(Sagas);
    
    // load previous
    persistStore(store, { 
        storage: AsyncStorage,
        whitelist: [
            'auth.accessToken',
            'auth.refreshToken',
            'auth.lastRefreshDate',
            'auth.email',
            'settings',
            'sets'
        ]}, () => {
            // on startup, always "fail" it so syncing variables go back into the queue to be synced
            store.dispatch(SetsActionCreators.failedUploadSets());

            // check the kill switch
            store.dispatch(KillSwitchActionCreators.fetchVersion());

            //obtain new tokens
            store.dispatch(StoreActionCreators.storeInitialized());
        }
    );

    // clear old legacy DB
    AsyncStorage.removeItem('@OpenBarbellPersistedStore');

    return store;
};

// TODO: debounce on config if performance issues
