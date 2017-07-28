import semver from 'semver';

import {
    FETCH_VERSION,
    VERSION_OK,
    VERSION_KILLED,
    VERSION_UNAVAILABLE
} from 'app/ActionTypes';

export const fetchVersion = () => {
    return {
        type: FETCH_VERSION
    };
};

export const versionOk = (currentVersion) => {
    return {
        type: VERSION_OK,
        currentVersion: currentVersion
    };
};

export const versionKilled = (currentVersion, fetchedVersion) => {
    return {
        type: VERSION_KILLED,
        currentVersion: currentVersion,
        fetchedVersion: fetchedVersion
    };
};

export const versionUnavailable = (currentVersion) => {
    return {
        type: VERSION_UNAVAILABLE,
        currentVersion: currentVersion
    };
};
