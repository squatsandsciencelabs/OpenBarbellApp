// KillSwitchMiddleware.js

// TODO: move this to both api.js AND the action creator
// There's no reason to have this as a middleware, but for now it's faster to just modify it to work

import { Platform } from 'react-native';
import semver from 'semver';
import {
	FETCH_VERSION,
	VERSION_OK,
	VERSION_KILLED
} from '../ActionTypes';
import DeviceInfo from 'react-native-device-info';
import { versionKilled, versionOk, versionUnavailable } from '../actions/KillSwitchActionCreators';

export default store => next => action => {
	console.log("ACTION " + JSON.stringify(action));
	switch (action.type) {
		case FETCH_VERSION:
			console.log("checking the kill switch!");
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
					console.log("version is less! KILL");
					store.dispatch(versionKilled(currentVersion, fetchedVersion));
				} else {
					console.log("version is >=! it okay");
					store.dispatch(versionOk(currentVersion));
				}

			})
			.catch((error) => {
				store.dispatch(versionUnavailable(currentVersion));
			});
			break;
		default:
			break;
	}
	return next(action)
}
