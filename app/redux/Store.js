import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import {persistStore, autoRehydrate} from 'redux-persist'

// middleware imports
import { compose, applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import Sagas from 'app/redux/sagas/Sagas';

// persisted store imports
import reducers from 'app/redux/reducers/Reducers';

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
        // TODO: migrate the default values :)
        // if (endSetTimerDuration === undefined || endSetTimerDuration == null) {
        //     Alert.alert(
        //         "Update",
        //         "After 30 seconds, your current set will automatically be ended in preparation for your next set. You can change this in Settings.",
        //     );
        //     endSetTimerDuration = 30;
        // }
    });

    return store;
};

// TODO: debounce on config if performance issues
