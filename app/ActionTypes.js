// scanning
export const START_DEVICE_SCAN = 'START_DEVICE_SCAN';
export const STOP_DEVICE_SCAN = 'STOP_DEVICE_SCAN';
export const FOUND_DEVICE = 'FOUND_DEVICE';
export const CONNECT_DEVICE = 'CONNECT_DEVICE';

// connection status
export const BLUETOOTH_OFF = 'BLUETOOTH_OFF';
export const DISCONNECTED_FROM_DEVICE = 'DISCONNECTED_FROM_DEVICE';
export const CONNECTING_TO_DEVICE = 'CONNECTING_TO_DEVICE';
export const CONNECTED_TO_DEVICE = 'CONNECTED_TO_DEVICE';

// connected
export const ADD_REP_DATA = 'ADD_REP_DATA';
export const DISCONNECT_DEVICE = 'DISCONNECT_DEVICE';

// auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SAVE_TOKENS = 'SAVE_TOKENS';
export const OBTAIN_NEW_TOKENS = 'OBTAIN_NEW_TOKENS';

// sets
export const SAVE_WORKOUT_SET = 'SAVE_WORKOUT_SET';
export const SAVE_WORKOUT_SET_TAGS = 'SAVE_WORKOUT_SET_TAGS';
export const SAVE_HISTORY_SET = 'SAVE_HISTORY_SET';
export const SAVE_HISTORY_SET_TAGS = 'SAVE_HISTORY_SET_TAGS';
export const SAVE_WORKOUT_REP = 'SAVE_WORKOUT_REP';
export const SAVE_HISTORY_REP = 'SAVE_HISTORY_REP';
export const END_SET = 'END_SET';
export const LOAD_PERSISTED_SET_DATA = 'LOAD_PERSISTED_SET_DATA';
export const END_WORKOUT = 'END_WORKOUT';
export const BEGIN_UPLOADING_SETS = 'BEGIN_UPLOADING_SETS';
export const UPDATE_SET_DATA_FROM_SERVER = 'UPDATE_SET_DATA_FROM_SERVER';
export const FINISH_UPLOADING_SETS = 'FINISH_UPLOADING_SETS';
export const FAILED_UPLOAD_SETS = 'FAILED_UPLOAD_SETS';

// sync
export const SYNC_REQUEST = 'SYNC_REQUEST';

// suggestions
export const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS';

// workout
export const PRESENT_WORKOUT_EXERCISE = 'PRESENT_WORKOUT_EXERCISE';
export const PRESENT_WORKOUT_TAGS = 'PRESENT_WORKOUT_TAGS';
export const PRESENT_WORKOUT_EXPANDED = 'PRESENT_WORKOUT_EXPANDED';
export const DISMISS_WORKOUT_EXERCISE = 'DISMISS_WORKOUT_EXERCISE';
export const DISMISS_WORKOUT_TAGS = 'DISMISS_WORKOUT_TAGS';
export const DISMISS_WORKOUT_EXPANDED = 'DISMISS_WORKOUT_EXPANDED';

// history
export const UPDATE_HISTORY_FILTER = 'UPDATE_HISTORY_FILTER';
export const EXPORTING_CSV = 'EXPORTING_CSV';
export const LOADING_HISTORY = 'LOADING_HISTORY';
export const PRESENT_HISTORY_EXERCISE = 'PRESENT_HISTORY_EXERCISE';
export const PRESENT_HISTORY_TAGS = 'PRESENT_HISTORY_TAGS';
export const PRESENT_HISTORY_EXPANDED = 'PRESENT_HISTORY_EXPANDED';
export const DISMISS_HISTORY_EXERCISE = 'DISMISS_HISTORY_EXERCISE';
export const DISMISS_HISTORY_TAGS = 'DISMISS_HISTORY_TAGS';
export const DISMISS_HISTORY_EXPANDED = 'DISMISS_HISTORY_EXPANDED';

// settings
export const SAVE_END_SET_TIMER = 'SAVE_END_SET_TIMER';
export const PRESENT_END_SET_TIMER = 'PRESENT_END_SET_TIMER';
export const DISMISS_END_SET_TIMER = 'DISMISS_END_SET_TIMER';

// kill switch
export const FETCH_VERSION = 'FETCH_VERSION';
export const VERSION_OK = 'VERSION_OK';
export const VERSION_KILLED = 'VERSION_KILLED';
export const VERSION_UNAVAILABLE = 'VERSION_UNAVAILABLE';