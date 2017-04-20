// app/actions//KillSwitchActionCreators.js

import semver from 'semver';

import {
	FETCH_VERSION,
	VERSION_OK,
	VERSION_KILLED,
	VERSION_UNAVAILABLE
} from '../ActionTypes';

export function fetchVersion() {
	return {
		type: FETCH_VERSION
	}
}

export function versionOk(currentVersion) {
	return {
		type: VERSION_OK,
		currentVersion: currentVersion
	}
}

export function versionKilled(currentVersion, fetchedVersion) {
	return {
		type: VERSION_KILLED,
		currentVersion: currentVersion,
		fetchedVersion: fetchedVersion
	}
}

export function versionUnavailable(currentVersion) {
	return {
		type: VERSION_UNAVAILABLE,
		currentVersion: currentVersion
	}
}
