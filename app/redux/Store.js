import { AsyncStorage, Platform } from 'react-native';
import {persistStore, autoRehydrate, getStoredState} from 'redux-persist';
import Reactotron from 'reactotron-react-native';
import { createFilter } from 'redux-persist-transform-filter';
import _ from 'lodash';

// store imports
import FilesystemStorage from 'redux-persist-filesystem-storage';
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
import * as Analytics from 'app/services/Analytics';

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
    if (Platform.OS === 'ios') {
        var storageMechanism = AsyncStorage;
    } else {
        var storageMechanism = FilesystemStorage;
    }
    const fsPersistor = persistStore(store, {
        storage: storageMechanism,
        blacklist: [
            'scannedDevices',
            'killSwitch',
            'suggestions',
            'durations',
        ],
        // note, everything in sets is to be persisted so not blacklisting or transforming them
        // note, everything in workoutCollapsed and historyCollapsed are to be persisted so not blacklisting or transforming
        transforms: [
            createFilter('auth', ['accessToken', 'refreshToken', 'lastRefreshDate', 'email']),
            createFilter('settings', ['defaultMetric', 'endSetTimerDuration', 'syncDate', 'wasTimerEdited', 'wasMetricEdited', 'lastExportCSVDate']),
            createFilter('collapsedSettings', ['metric1', 'quantifier1', 'metric2', 'quantifier2', 'metric3', 'quantifier3', 'metric4', 'quantifier4', 'metric5', 'quantifier5']),            
            createFilter('workout', ['removedCounter', 'restoredCounter']),
            createFilter('history', ['viewedCounter']),
            createFilter('analysis', ['exercise', 'velocitySlider', 'daysRange', 'tagsToInclude', 'tagsToExclude']),
            createFilter('appState', ['multiTaskCounter', 'lockedCounter']),
            createFilter('connectedDevice', ['numDisconnects', 'numReconnects']),
            createFilter('survey', ['surveyURL', 'completedSurveyURLs', 'optedOutEndWorkoutPromptSurveyURLs']),
        ]}, async (fsError, fsResult) => {
            // Android filesystem migration
            // See https://github.com/rt2zz/redux-persist/issues/679 for details
            if (Platform.OS !== 'ios' && _.isEmpty(fsResult)) {
                try {
                    const asyncState = await getStoredState({
                        storage: AsyncStorage,
                    })
                    if (!_.isEmpty(asyncState)) {
                        fsPersistor.rehydrate(asyncState, {
                            serial: false,
                        })
                    }
                } catch (getStateError) {
                    console.warn('getStoredState error', getStateError)
                }
            }

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
