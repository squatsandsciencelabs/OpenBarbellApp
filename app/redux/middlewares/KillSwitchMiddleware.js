// TODO: split this into both api.js AND the action creator
// There's no reason to have this as a middleware, but for now it's faster to just modify it to work

// TODO: move the kill switch url to the config file

import { Platform } from 'react-native';
import {
    FETCH_VERSION,
    VERSION_OK,
    VERSION_KILLED
} from 'app/ActionTypes';
import semver from 'semver';
import DeviceInfo from 'react-native-device-info';

import * as KillSwitchActionCreators from 'app/redux/shared_actions/KillSwitchActionCreators';

export default store => next => action => {
    switch (action.type) {
        case FETCH_VERSION:
            var currentVersion = DeviceInfo.getVersion();

            fetch('https://obbserver.herokuapp.com/killswitch', {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var fetchedVersion = responseJson[Platform.OS]['minimum_version'];

                if (semver.lt(currentVersion, fetchedVersion)) {
                    store.dispatch(KillSwitchActionCreators.versionKilled(currentVersion, fetchedVersion));
                } else {
                    store.dispatch(KillSwitchActionCreators.versionOk(currentVersion));
                }

            })
            .catch((error) => {
                store.dispatch(KillSwitchActionCreators.versionUnavailable(currentVersion));
            });
            break;
        default:
            break;
    }
    return next(action)
}
