import semver from 'semver';

import {
    FETCH_VERSION,
    VERSION_OK,
    VERSION_KILLED,
    VERSION_UNAVAILABLE
} from 'app/ActionTypes';

export const fetchVersion = () => ( {type: FETCH_VERSION });

export const versionOk = (currentVersion) => ({
    type: VERSION_OK,
    currentVersion: currentVersion
});

export const versionKilled = (currentVersion, fetchedVersion) => ({
    type: VERSION_KILLED,
    currentVersion: currentVersion,
    fetchedVersion: fetchedVersion
});

export const versionUnavailable = (currentVersion) => ({
    type: VERSION_UNAVAILABLE,
    currentVersion: currentVersion
});
