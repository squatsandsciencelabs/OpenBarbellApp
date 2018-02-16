import {
    FETCH_VERSION,
    VERSION_OK,
    VERSION_KILLED,
    VERSION_UNAVAILABLE
} from 'app/configs+constants/ActionTypes';

const KillSwitchReducer = ( state = { status: 'FETCH', currentVersion: null, fetchedVersion: null }, action) => {
    switch (action.type) {
        case FETCH_VERSION:
            return Object.assign({}, state, {
                status: 'FETCH',
                currentVersion: null,
                fetchedVersion: null
            });
        case VERSION_OK:
            return Object.assign({}, state, {
                status: 'OK',
                currentVersion: action.currentVersion,
                fetchedVersion: action.fetchedVersion
            });
        case VERSION_KILLED:
            return Object.assign({}, state, {
                status: 'KILLED',
                currentVersion: action.currentVersion,
                fetchedVersion: action.fetchedVersion
            });
        case VERSION_UNAVAILABLE:
            return Object.assign({}, state, {
                status: 'OK',
                currentVersion: action.currentVersion,
                fetchedVersion: "Unavailable"
            });
        default:
            return state
    }
};

export default KillSwitchReducer;