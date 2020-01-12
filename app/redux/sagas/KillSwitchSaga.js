import { Platform } from 'react-native';
import { take, put, call, apply } from 'redux-saga/effects';
import semver from 'semver';
import { getVersion } from 'react-native-device-info';

import OpenBarbellConfig from 'app/configs+constants/OpenBarbellConfig.json';
import * as KillSwitchActionCreators from 'app/redux/shared_actions/KillSwitchActionCreators';

import {
    FETCH_VERSION,
    VERSION_OK,
    VERSION_KILLED
} from 'app/configs+constants/ActionTypes';

const KillSwitchSaga = function * KillSwitchSaga() {
    yield take(FETCH_VERSION);
    try {
        const fetchedVersion = yield call(fetchVersion);
        const currentVersion = yield call(getVersion);
        if (semver.lt(currentVersion, fetchedVersion)) {
            yield put(KillSwitchActionCreators.versionKilled(currentVersion, fetchedVersion));
        } else {
            yield put(KillSwitchActionCreators.versionOk(currentVersion));
        }
    } catch (error) {
        yield put(KillSwitchActionCreators.versionUnavailable());
    }
};

const fetchVersion = () => {
    return new Promise((resolve, reject) => {
        fetch(OpenBarbellConfig.killSwitchURL, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var fetchedVersion = responseJson[Platform.OS]['minimum_version'];
            resolve(fetchedVersion);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export default KillSwitchSaga;
