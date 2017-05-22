// app/reducers/Reducers.js

import { combineReducers } from 'redux'
import SetReducer from './SetReducer';
import ScannedDevicesReducer from './ScannedDevicesReducer';
import ConnectedDeviceReducer from './ConnectedDeviceReducer';
import WorkoutReducer from './WorkoutReducer';
import HistoryReducer from './HistoryReducer';
import KillSwitchReducer from './KillSwitchReducer';
import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';
import SuggestionsReducer from './SuggestionsReducer';

export default reducers = combineReducers({
	sets: SetReducer,
	scannedDevices: ScannedDevicesReducer,
	connectedDevice: ConnectedDeviceReducer,
	workout: WorkoutReducer,
	history: HistoryReducer,
	killSwitch: KillSwitchReducer,
	auth: AuthReducer,
	suggestions: SuggestionsReducer,
	settings: SettingsReducer,
});
