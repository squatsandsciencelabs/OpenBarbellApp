// app/storage/Store.js

import { createStore }  from 'redux';
import reducers from '../reducers/Reducers';
import middlewares from '../middlewares/Middlewares';
import throttle from 'lodash/throttle';
import config from '../config.json';
import { Alert, AsyncStorage } from 'react-native';
import { LOAD_PERSISTED_SET_DATA } from '../ActionTypes';
import * as SetActionCreators from '../actions/SetActionCreators';
import * as AuthActionCreators from '../actions/AuthActionCreators';
import * as SettingsActionCreators from '../actions/SettingsActionCreators';

const key = '@OpenBarbellPersistedStore'

export default initializeStore = () => {
	// create the store
	let store = createStore(reducers, middlewares);

	// load previous
	loadInitialState(store);

	return store;
}

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
		console.log("error saving state " + err);
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
				store.dispatch(SetActionCreators.reAddSetsToUpload());
			}

			// load previous settings
			if (value.settings !== undefined) {
				let endSetTimerDuration = value.settings.endSetTimerDuration;
				if (endSetTimerDuration === undefined || endSetTimerDuration == null) {
					Alert.alert(
						"Update",
						"After 30 seconds, your current set will automatically be ended in preparation for your next set. You can change this in Settings.",
					);
					endSetTimerDuration = 30;
				}
				store.dispatch(SettingsActionCreators.updateSetTimer(endSetTimerDuration));
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
				console.log("loading previous " + refreshToken + " " + accessToken + " " + email);
				store.dispatch(AuthActionCreators.saveUser(refreshToken, accessToken, email));
			}
			store.dispatch(AuthActionCreators.finishedAttemptLogin());
		}
		addSaveListener(store);
	} catch (err) {
		console.log("error load initial state " + err);
		// TODO: See when this would actually happen, is it possible?
		// Possibly display an error message across the app
	}
}

const addSaveListener = (store) => {
	store.subscribe(throttle(() => {
		let state = store.getState();
		saveState({
			sets: state.sets,
			auth: state.auth,
			settings: state.settings
		});
	}, config.storageThrottle));
}
