import { combineReducers } from 'redux'
import SetsReducer from './SetsReducer';
import ScannedDevicesReducer from './ScannedDevicesReducer';
import ConnectedDeviceReducer from './ConnectedDeviceReducer';
import WorkoutReducer from './WorkoutReducer';
import WorkoutCollapsedReducer from './WorkoutCollapsedReducer';
import HistoryReducer from './HistoryReducer';
import HistoryCollapsedReducer from './HistoryCollapsedReducer';
import KillSwitchReducer from './KillSwitchReducer';
import AuthReducer from './AuthReducer';
import SettingsReducer from './SettingsReducer';
import CollapsedSettingsReducer from './CollapsedSettingsReducer';
import SuggestionsReducer from './SuggestionsReducer';
import AppStateReducer from './AppStateReducer';
import DurationsReducer from './DurationsReducer';
import AnalysisReducer from './AnalysisReducer';

export default reducers = combineReducers({
    sets: SetsReducer,
    scannedDevices: ScannedDevicesReducer,
    connectedDevice: ConnectedDeviceReducer,
    workout: WorkoutReducer,
    workoutCollapsed: WorkoutCollapsedReducer,
    history: HistoryReducer,
    historyCollapsed: HistoryCollapsedReducer,
    killSwitch: KillSwitchReducer,
    auth: AuthReducer,
    suggestions: SuggestionsReducer,
    settings: SettingsReducer,
    collapsedSettings: CollapsedSettingsReducer,
    appState: AppStateReducer,
    durations: DurationsReducer,
    analysis: AnalysisReducer
});
