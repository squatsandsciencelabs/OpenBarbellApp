// TODO: refactor the store to use redux-persist, will clean it up greatly
// TODO: kill switch should not be a middleware, make it into an action / saga

import throttle from 'lodash/throttle';
import { Alert, AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';

// middleware imports
import { applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import Sagas from 'app/redux/sagas/Sagas';

// persisted store imports
import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import reducers from 'app/redux/reducers/Reducers';
import { LOAD_PERSISTED_SET_DATA } from 'app/ActionTypes';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import * as SuggestionsActionCreators from 'app/redux/shared_actions/SuggestionsActionCreators';
const key = '@OpenBarbellPersistedStore';

// TODO: remove saga monitor from production, same way should remove console.tron from production
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const middlewares = applyMiddleware(
    thunk,
    sagaMiddleware
);

export default initializeStore = () => {
    // create the store
    let store = Reactotron.createStore(reducers, middlewares);

    // run sagas
    sagaMiddleware.run(Sagas);
    
    // load previous
    loadInitialState(store);

    return store;
};

// Persisted State
// Because react native pushes us to use async storage, yet needs the state to be created at the start...
// We cannot use the default store as per the Redux tutorial
// Instead we put the code all in Store.js and use the reducers to forcibly reset all set information

const saveState = async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem(key, serializedState);
    } catch (err) {
        // TODO: See when this would actually happen, is it possible?
        // Possibly display an error message across the app
        console.tron.log("error saving state " + err);
    }
};

const loadInitialState = async (store) => {
    try {
        const value = await AsyncStorage.getItem(key);
        value = JSON.parse(value);
        if (value !== null && value !== undefined) {
            // load previous set data
            if (value.sets !== undefined) {
                store.dispatch({
                    type: LOAD_PERSISTED_SET_DATA,
                    sets: value.sets
                });

                // on failed uploading sets
                store.dispatch(SetsActionCreators.failedUploadSets());
            }

            // load previous settings
            var syncDate = null;
            if (value.settings !== undefined) {
                // end set timer
                let endSetTimerDuration = value.settings.endSetTimerDuration;
                if (endSetTimerDuration === undefined || endSetTimerDuration == null) {
                    Alert.alert(
                        "Update",
                        "After 30 seconds, your current set will automatically be ended in preparation for your next set. You can change this in Settings.",
                    );
                    endSetTimerDuration = 30;
                }
                store.dispatch(SettingsActionCreators.saveEndSetTimer(endSetTimerDuration));

                // sync date - set on login succeeded
                syncDate = value.settings.syncDate;
                if (syncDate === undefined || null) {
                    // it's empty, default to empty string
                    syncDate = '';
                } else if (typeof syncDate === 'string') {
                    // it's a string - aka it was saved properly, try parsing it into a date
                    syncDate = new Date(syncDate);
                } else {
                    // failsafe, unknown object type, just make it an empty string
                    syncDate = '';
                }
            }

            // load previous auth data
            if (value.auth !== undefined) {
                let refreshToken = value.auth.refreshToken;
                if (refreshToken === undefined) {
                    refreshToken = null;
                }
                let accessToken = value.auth.accessToken;
                if (accessToken === undefined) {
                    accessToken = null;
                }
                let email = value.auth.email;
                if (email === undefined) {
                    email = null;
                }
                console.tron.log("loading previous " + refreshToken + " " + accessToken + " " + email + " " + syncDate);
                store.dispatch(AuthActionCreators.loginSucceeded(refreshToken, accessToken, email, syncDate));
            }
        }

        addSaveListener(store);
    } catch (err) {
        console.tron.log("error load initial state " + err);
        // TODO: See when this would actually happen, is it possible?
        // Possibly display an error message across the app
    }
};

const addSaveListener = (store) => {
    store.subscribe(throttle(() => {
        let state = store.getState();
        saveState({
            sets: state.sets,
            auth: state.auth,
            settings: state.settings
        });
    }, OpenBarbellConfig.storageThrottle));
};
