import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import {persistStore, autoRehydrate} from 'redux-persist'

// store imports
import { compose, applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import Sagas from 'app/redux/sagas/Sagas';
import reducers from 'app/redux/reducers/Reducers';

// startup imports
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import Bluetooth from 'app/services/Bluetooth';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as KillSwitchActionCreators from 'app/redux/shared_actions/KillSwitchActionCreators';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

// TODO: remove saga monitor from production, same way should remove console.tron from production
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middlewares = applyMiddleware(
    thunk,
    sagaMiddleware
);
const enhancers = compose(middlewares, autoRehydrate());

export default initializeStore = () => {
    // create the store
    let store = Reactotron.createStore(reducers, enhancers);

    // run sagas
    sagaMiddleware.run(Sagas);
    
    // load previous
    persistStore(store, { 
        storage: AsyncStorage,
        whitelist: [
            'auth',
            'settings',
            'sets'
        ]}, () => {
            // configure google sign in
            GoogleSignInSetup.configure();

            // start the bluetooth
            Bluetooth(store);                        
            
            // on startup, always "fail" it so syncing variables go back into the queue to be synced
            store.dispatch(SetsActionCreators.failedUploadSets());

            // obtain new tokens
            store.dispatch(AuthActionCreators.obtainNewTokens());        

            // check the kill switch
            store.dispatch(KillSwitchActionCreators.fetchVersion());
        }
    );

    // clear old legacy DB
    AsyncStorage.removeItem('@OpenBarbellPersistedStore');

    return store;
};

// TODO: debounce on config if performance issues
