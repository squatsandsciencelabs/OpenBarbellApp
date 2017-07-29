import API from 'app/services/API';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SetActionCreators from './SetActionCreators';
import * as SettingsActionCreators from './SettingsActionCreators';

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
        console.tron.log("Not logged in, backing out of sync");
        return;
    }

    if (state.sets.setIDsBeingUploaded.length > 0) {
        console.tron.log("still uploading, ignore upload");
        return;
    }

    let sets = SetsSelectors.getSetsToUpload(state.sets);
    let accessToken = state.auth.accessToken;
    let refreshToken = state.auth.refreshToken;

    if (sets.length > 0) {
        // upload
        dispatch(SetActionCreators.beginUploadingSets());
        return API.postUpdatedSetData(sets, dispatch, accessToken, refreshToken, (revision) => {
            // success

            // still logged in check
            let state = getState();
            if (state.auth.email === null) {
                console.tron.log("upload data via a sync but you've been logged out, ignore it");
                return;
            }

            // clear the sets being uploaded
            dispatch(SetActionCreators.clearSetsBeingUploaded());

            // update the revision
            dispatch(SetActionCreators.updateRevisionFromServer(revision));
        }, () => {
            // still logged in check
            let state = getState();
            if (state.auth.email === null) {
                return;
            }

            // failure, add the sets being uploaded back
            dispatch(SetActionCreators.reAddSetsToUpload());
        });
    } else {
        // download
        let revision = state.sets.revision;
        console.tron.log("syncing with revision " + revision);

        return API.sync(revision, dispatch, accessToken, refreshToken, (revision, sets) => {
            let state = getState();

            // still logged in check
            if (state.auth.email === null) {
                console.tron.log("sync completed but you're logged out, ignore it");
                return;
            }

            // ensure there's no local updates
            if (state.sets.setIDsToUpload.length > 0 || state.sets.setIDsBeingUploaded.length > 0) {
                console.tron.log("Sync data came back from the server, but local changes were made in the meantime, backing out of updating server information");
                return;
            }

            // update data
            if (revision !== null && sets !== null) {
                dispatch(SetActionCreators.updateSetDataFromServer(revision, sets));
            }

            // update the sync date
            dispatch(SettingsActionCreators.saveSyncDate(new Date()));
        });
    }
};
