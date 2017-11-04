import { combineReducers } from 'redux'
import SetsReducer from './SetsReducer';
import ScannedDevicesReducer from './ScannedDevicesReducer';
import ConnectedDeviceReducer from './ConnectedDeviceReducer';
import WorkoutReducer from './WorkoutReducer';
import HistoryReducer from './HistoryReducer';
import KillSwitchReducer from './KillSwitchReducer';
import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';
import SuggestionsReducer from './SuggestionsReducer';
import AppStateReducer from './AppStateReducer';
import DurationsReducer from './DurationsReducer';
import CollapsedModelReducer from './CollapsedModelReducer';

export default reducers = combineReducers({
    sets: SetsReducer,
    scannedDevices: ScannedDevicesReducer,
    connectedDevice: ConnectedDeviceReducer,
    workout: WorkoutReducer,
    history: HistoryReducer,
    killSwitch: KillSwitchReducer,
    auth: AuthReducer,
    suggestions: SuggestionsReducer,
    settings: SettingsReducer,
    appState: AppStateReducer,
    durations: DurationsReducer,
    collapsedModels: CollapsedModelReducer,
});
