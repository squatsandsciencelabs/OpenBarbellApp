// app/actions/ApiActionCreators.js

import api from '../api/api';
import { getSetsToUpload } from '../reducers/SetReducer';
import * as SetActionCreators from './SetActionCreators';

// TODO: fix syncing bug where if you begin an upload, change the data, then the upload succeeds, it can prevent uploading of the changed data until the next time they change something
// SOLUTION:
// - on sync, store the IDs of what is being uploaded to the server in a separate field
// - make sure you do not attempt more than 1 sync at a time
// - then on success clear the separate field of IDs (in case there's new updates to sync)
// - then on failure, move those IDs back to the original field of to uploads

// expects the store's base state
export const syncData = () => (dispatch, getState) => {
	let state = getState();

	if (state.auth.email === undefined || state.auth.email === null) {
		console.log("Not logged in, backing out of sync");
		return;
	}

	if (state.sets.setIDsBeingUploaded.length > 0) {
		console.log("still uploading, ignore upload");
		return;
	}

	let sets = getSetsToUpload(state.sets);
	let accessToken = state.auth.accessToken;
	let refreshToken = state.auth.refreshToken;

	if (sets.length > 0) {
		// upload
		dispatch(SetActionCreators.beginUploadingSets());
		return api.postUpdatedSetData(sets, dispatch, accessToken, refreshToken, (revision) => {
			// success

			// clear the sets being uploaded
			dispatch(SetActionCreators.clearSetsBeingUploaded());

			// update the revision
			dispatch(SetActionCreators.updateRevisionFromServer(revision));
		}, () => {
			// failure, add the sets being uploaded back
			dispatch(SetActionCreators.reAddSetsToUpload());
		});
	} else {
		// download
		let revision = state.sets.revision;
		console.log("syncing with revision " + revision);

		return api.sync(revision, dispatch, accessToken, refreshToken, (revision, sets) => {
			// ensure there's no local updates
			let state = getState();
			if (state.sets.setIDsToUpload.length > 0 || state.sets.setIDsBeingUploaded.length > 0) {
				console.log("Sync data came back from the server, but local changes were made in the meantime, backing out of updating server information");
				return;
			}

			dispatch(SetActionCreators.updateSetDataFromServer(revision, sets));
		});
	}
};
