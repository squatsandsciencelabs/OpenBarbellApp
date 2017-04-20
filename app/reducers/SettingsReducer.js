// app/reducers/SettingsReducer.js

import {
	SETTINGS_UPDATE_SET_TIMER,
	SETTINGS_EDIT_SET_TIMER,
	SETTINGS_END_EDIT_SET_TIMER
} from '../ActionTypes';

const defaultState = {
	endSetTimerDuration: 30,
	editingEndSetTimer: false
};

const SettingsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SETTINGS_UPDATE_SET_TIMER:
			return Object.assign({}, state, {
				endSetTimerDuration: action.endSetTimerDuration,
			});
		case SETTINGS_EDIT_SET_TIMER:
			return Object.assign({}, state, {
				editingEndSetTimer: true,
			});
		case SETTINGS_END_EDIT_SET_TIMER:
			return Object.assign({}, state, {
				editingEndSetTimer: false,
			});
		default:
			return state;
	}
};

export default SettingsReducer;
